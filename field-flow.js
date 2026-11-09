// Passive dye and heat transported by a prescribed incompressible flow.
// This is an illustration, not a calibrated solver or a reconstruction model.
export function createFlow(gl, buffer, vertexSource) {
  const width = 768,
    height = 384;
  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(
    gl.FRAGMENT_SHADER,
    `
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_size;
uniform float u_dt,u_time,u_initial;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*f*(f*(f*6.-15.)+10.);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float n=0.,a=.5;for(int i=0;i<4;i++){n+=a*noise(p);p=mat2(.8,.6,-.6,.8)*p*2.01+3.7;a*=.5;}return n;}
vec2 twist(vec2 p,vec2 center,float amount){vec2 d=p-center;float angle=amount*exp(-dot(d,d)*1.6);float s=sin(angle),c=cos(angle);return center+mat2(c,-s,s,c)*d;}
vec2 velocity(vec2 p,float t){
 vec2 v=vec2(.115+.025*sin(p.y*2.3),.012*cos(p.x*1.6+t*.025));
 vec2 c1=vec2(-.66+.06*sin(t*.019),.12+.05*cos(t*.023));
 vec2 c2=vec2(.48+.07*cos(t*.017),-.14+.04*sin(t*.021));
 vec2 c3=vec2(1.36+.04*sin(t*.013),.20);
 vec2 d=p-c1;float r=dot(d,d);v+=vec2(-d.y,d.x)*.095*exp(-r*1.3)/(r+.10);
 d=p-c2;r=dot(d,d);v-=vec2(-d.y,d.x)*.09*exp(-r*1.3)/(r+.09);
 d=p-c3;r=dot(d,d);v+=vec2(-d.y,d.x)*.055*exp(-r*2.)/(r+.08);
 return v;
}
vec3 seed(vec2 p,float t){
 vec2 q=twist(p,vec2(-.65,.1),4.5);q=twist(q,vec2(.55,-.1),-4.0);
 q.y+=.10*sin(q.x*2.2)+.035*sin(q.x*5.1);
 float envelope=exp(-pow(q.y/.42,4.));
 float heat=.1+.65*exp(-dot((p-vec2(-.55,-.1))/vec2(.8,.45),(p-vec2(-.55,-.1))/vec2(.8,.45)));
 return vec3(clamp(.5+q.y*.20+.008*fbm(q*4.),0.,1.),heat,envelope*(.26+.44*fbm(q*2.4)));
}
void main(){
 vec2 uv=gl_FragCoord.xy/u_size;
 vec2 p=(uv-.5)*vec2(4.24,2.);
 if(u_initial>.5){gl_FragColor=vec4(seed(p,u_time),1.);return;}
 vec2 v=velocity(p,u_time);
 vec2 mid=p-.5*u_dt*v;
 vec2 back=uv-u_dt*velocity(mid,u_time)/vec2(4.24,2.);
 vec3 state=texture2D(u_state,clamp(back,vec2(.001),vec2(.999))).rgb;
 vec2 pixel=1./u_size;
 vec3 average=(texture2D(u_state,back+vec2(pixel.x,0.)).rgb+texture2D(u_state,back-vec2(pixel.x,0.)).rgb+texture2D(u_state,back+vec2(0.,pixel.y)).rgb+texture2D(u_state,back-vec2(0.,pixel.y)).rgb)*.25;
 state=mix(state,average,vec3(.012,.04,.027)*u_dt*30.);
 // A quiet upstream source replenishes the transported scalar fields.
 float inlet=(1.-smoothstep(-2.1,-1.72,p.x));
 vec3 source=seed(vec2(p.x,p.y+.035*sin(u_time*.033)),u_time);
 state=mix(state,source,inlet*.18);
 gl_FragColor=vec4(max(state,vec3(0.)),1.);
}`,
  );
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(program));
  const uniforms = Object.fromEntries(
    ["state", "size", "dt", "time", "initial"].map((n) => [
      n,
      gl.getUniformLocation(program, "u_" + n),
    ]),
  );
  const full = gl.getExtension("OES_texture_float");
  const fullLinear = gl.getExtension("OES_texture_float_linear");
  const renderFull = gl.getExtension("WEBGL_color_buffer_float");
  const half = gl.getExtension("OES_texture_half_float");
  const linear = gl.getExtension("OES_texture_half_float_linear");
  const renderHalf = gl.getExtension("EXT_color_buffer_half_float");
  let type = full && fullLinear && renderFull ? gl.FLOAT : half && linear && renderHalf ? half.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;
  let targets = [];
  function target() {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      width,
      height,
      0,
      gl.RGBA,
      type,
      null,
    );
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0,
    );
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      gl.deleteFramebuffer(framebuffer);
      gl.deleteTexture(texture);
      return null;
    }
    return { texture, framebuffer };
  }
  let first = target();
  if (!first) {
    type = gl.UNSIGNED_BYTE;
    first = target();
  }
  const second = target();
  if (!first || !second) {
    if (first) {
      gl.deleteFramebuffer(first.framebuffer);
      gl.deleteTexture(first.texture);
    }
    gl.deleteProgram(program);
    return null;
  }
  targets = [first, second];
  let read = 0;
  function render(dt, time, initial) {
    const write = 1 - read;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.viewport(0, 0, width, height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, targets[write].framebuffer);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, targets[read].texture);
    gl.uniform1i(uniforms.state, 0);
    gl.uniform2f(uniforms.size, width, height);
    gl.uniform1f(uniforms.dt, dt);
    gl.uniform1f(uniforms.time, time);
    gl.uniform1f(uniforms.initial, initial);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    read = write;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
  render(0, 0, 1);
  // Seed the complete domain so the first frame is as composed as later frames.
  for (let i = 0; i < 12; i++) render(0.09, i * 0.09, 0);
  return {
    get texture() {
      return targets[read].texture;
    },
    step(dt, time) {
      if (dt > 0) render(Math.min(dt, 0.06) * 0.62, time, 0);
    },
    dispose() {
      for (const t of targets) {
        gl.deleteFramebuffer(t.framebuffer);
        gl.deleteTexture(t.texture);
      }
      gl.deleteProgram(program);
    },
    precision: type === gl.UNSIGNED_BYTE ? "byte" : type === gl.FLOAT ? "float" : "half-float",
  };
  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(message);
    }
    return shader;
  }
}
