import { weightsAt } from "./field-mix.js";

const canvas = document.getElementById("field");
if (canvas) mountField(canvas);

function mountField(canvas) {
  const shell = canvas.closest(".field-shell");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const still = new URLSearchParams(location.search).has("static");
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: false,
  });
  if (!gl || !gl.getExtension("OES_standard_derivatives")) return;
  const vertexSource = `attribute vec2 a_position;
    void main(){gl_Position=vec4(a_position,0.,1.);}`;
  const fragmentSource = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_mix;
const vec3 NIGHT=vec3(.012,.043,.078);
const vec3 TEAL=vec3(.11,.53,.55);
const vec3 CYAN=vec3(.36,.77,.78);
const vec3 AMBER=vec3(.65,.40,.18);
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(.80,.60,-.60,.80);for(int i=0;i<4;i++){v+=a*noise(p);p=m*p*2.03+vec2(5.1,7.9);a*=.5;}return v;}
float gaussian(vec2 p,vec2 c,vec2 scale){vec2 d=(p-c)/scale;return exp(-dot(d,d));}
float line(float phase,float width){float d=abs(fract(phase+.5)-.5);float aa=max(fwidth(phase),.0001);return 1.-smoothstep(width,width+aa*.85,d);}
vec2 vortex(vec2 p,vec2 c,float strength){vec2 d=p-c;float angle=strength*exp(-dot(d,d)*.85);float s=sin(angle),cosa=cos(angle);return c+mat2(cosa,-s,s,cosa)*d;}
vec3 ribbons(vec2 p,float t,vec2 warp){
  vec2 q=p+warp*.46;
  float flow=q.y*3.15+.56*sin(q.x*1.52+t*.043)+.19*sin(q.x*3.4-q.y*1.2-t*.026);
  float bands=pow(.5+.5*sin(flow*3.5),5.);
  float threads=line(flow*9.+.45*sin(q.x*2.1-t*.034),.042);
  float fine=line(flow*23.+q.x*.25,.025);
  float envelope=.35+.65*gaussian(p,vec2(.05,-.05),vec2(1.9,1.05));
  float warm=pow(.5+.5*sin(q.x*1.35+q.y*.6+t*.019),9.);
  vec3 hue=mix(TEAL,CYAN,.5+.5*sin(flow*.7));
  return hue*(bands*.18+threads*.47+fine*.10)*envelope+AMBER*warm*bands*.12;
}
vec3 vortices(vec2 p,float t,vec2 warp){
  vec2 q=p+warp*.24;
  q=vortex(q,vec2(-.67+.11*sin(t*.017),.18+.13*cos(t*.023)),3.2);
  q=vortex(q,vec2(.78+.12*cos(t*.019),-.21+.11*sin(t*.027)),-3.5);
  q=vortex(q,vec2(.06+.08*sin(t*.013),-.67),1.7);
  float psi=q.y*2.15+.5*sin(q.x*1.85+t*.026)+.22*sin(q.y*3.-q.x*2.1-t*.017);
  float filaments=line(psi*16.,.038);
  float finer=line(psi*31.+.13*sin(q.x*4.),.025);
  float body=pow(.5+.5*sin(psi*5.),7.);
  return mix(TEAL,CYAN,.5+.5*sin(psi))*(filaments*.43+finer*.12+body*.16)+AMBER*body*.08*gaussian(p,vec2(.7,.3),vec2(.6,.5));
}
vec3 thermal(vec2 p,float t,vec2 warp){
  vec2 q=p+warp*.35;
  float warm=gaussian(q,vec2(-.62+.20*sin(t*.014),-.08+.16*cos(t*.021)),vec2(.58,.76));
  warm+=.65*gaussian(q,vec2(.8+.14*cos(t*.017),.3+.17*sin(t*.013)),vec2(.47,.55));
  float cool=gaussian(q,vec2(.05+.18*sin(t*.019),.1),vec2(.65,.8));
  float variation=fbm(q*2.+vec2(t*.009,-t*.012));
  float plume=pow(smoothstep(.13,.83,warm*.64+variation*.34),1.4);
  vec3 color=TEAL*(cool*.28+variation*.075)+AMBER*plume*.82;
  float boundaries=exp(-abs(warm-.43)*21.);
  return color+mix(TEAL,AMBER,.7)*boundaries*.065;
}
vec3 contours(vec2 p,float t,vec2 warp){
  vec2 q=p+warp*.12;
  float value=1.12*gaussian(q,vec2(-.72+.12*sin(t*.017),.12),vec2(.70,.64));
  value-=.89*gaussian(q,vec2(.66,-.15+.13*cos(t*.019)),vec2(.82,.54));
  value+=.23*sin(q.x*1.4+q.y*1.8+t*.018)+.13*q.y;
  float minor=line(value*22.,.018);
  float major=line(value*5.5,.012);
  float tint=.5+.5*sin(value*3.);
  return mix(TEAL,CYAN,tint)*(minor*.29+major*.31)+TEAL*value*value*.045;
}
vec3 sensor(vec2 uv,vec2 point){
  vec2 d=(uv-point)*u_resolution;float r=length(d);
  float size=clamp(u_resolution.x/1100.,.7,1.45);
  float core=1.-smoothstep(.8*size,2.1*size,r);
  float halo=exp(-r*r/(29.*size*size))*.30;
  float outer=exp(-r*r/(145.*size*size))*.055;
  float ring=(1.-smoothstep(.35*size,1.05*size,abs(r-5.*size)))*.19;
  return vec3(.70,.94,.94)*core+vec3(.18,.66,.73)*(halo+outer+ring);
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution;
  vec2 p=(uv-.5)*vec2(u_resolution.x/u_resolution.y,1.)*2.;
  float t=u_time;
  vec2 adv=p+vec2(-t*.009,t*.004);
  vec2 warp=vec2(fbm(adv*1.35+vec2(t*.003,2.3)),fbm(adv*1.35+vec2(7.4,-t*.005)))-.5;
  vec3 field=vec3(0.);
  if(u_mix.x>.0001)field+=ribbons(p,t,warp)*u_mix.x;
  if(u_mix.y>.0001)field+=vortices(p,t,warp)*u_mix.y;
  if(u_mix.z>.0001)field+=thermal(p,t,warp)*u_mix.z;
  if(u_mix.w>.0001)field+=contours(p,t,warp)*u_mix.w;
  float vignette=1.-.36*smoothstep(.3,1.4,length((uv-.5)*vec2(1.1,1.)));
  vec3 color=NIGHT+field*vignette;
  color+=sensor(uv,vec2(.14,.68));color+=sensor(uv,vec2(.30,.32));
  color+=sensor(uv,vec2(.43,.78));color+=sensor(uv,vec2(.61,.45));
  color+=sensor(uv,vec2(.78,.71));color+=sensor(uv,vec2(.88,.25));
  gl_FragColor=vec4(color,1.);
}`;
  let program,
    buffer,
    uniforms,
    frame = null,
    lastDraw = -Infinity,
    visible = true,
    lost = false,
    disposed = false;
  const started = performance.now();
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
  function initialize() {
    let vertex, fragment;
    try {
      vertex = compile(gl.VERTEX_SHADER, vertexSource);
      fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
      program = gl.createProgram();
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(program));
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(
        ["resolution", "time", "mix"].map((name) => [
          name,
          gl.getUniformLocation(program, "u_" + name),
        ]),
      );
      shell.dataset.renderer = "webgl";
      return true;
    } catch (error) {
      console.warn(
        "Illustrative field is using its still fallback:",
        error.message,
      );
      release();
      return false;
    } finally {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
    }
  }
  function release() {
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
    buffer = program = null;
    shell.dataset.ready = "false";
  }
  function draw(now) {
    if (!program || lost || disposed) return;
    const seconds = still || reduced.matches ? 6 : (now - started) / 1000;
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.time, seconds);
    gl.uniform4fv(uniforms.mix, weightsAt(seconds));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    shell.dataset.ready = "true";
  }
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(
      devicePixelRatio || 1,
      1.5,
      Math.sqrt(1050000 / Math.max(1, rect.width * rect.height)),
    );
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    draw(performance.now());
  }
  function tick(now) {
    frame = null;
    if (now - lastDraw >= 1000 / 30) {
      draw(now);
      lastDraw = now;
    }
    if (
      !disposed &&
      !lost &&
      visible &&
      !document.hidden &&
      !reduced.matches &&
      !still
    )
      frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    if (lost || disposed || !program) return;
    if (reduced.matches || still) draw(performance.now());
    else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function contextLost(event) {
    event.preventDefault();
    lost = true;
    shell.dataset.ready = "false";
    sync();
  }
  function contextRestored() {
    lost = false;
    gl.getExtension("OES_standard_derivatives");
    if (initialize()) {
      resize();
      sync();
    }
  }
  if (!initialize()) return;
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            visible = entries[0].isIntersecting;
            sync();
          },
          { rootMargin: "80px" },
        )
      : null;
  if (observer) observer.observe(canvas);
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);
  window.addEventListener("pagehide", function cleanup(event) {
    if (event.persisted) {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      return;
    }
    disposed = true;
    if (frame !== null) cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    if (observer) observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
    reduced.removeEventListener("change", sync);
    canvas.removeEventListener("webglcontextlost", contextLost);
    canvas.removeEventListener("webglcontextrestored", contextRestored);
    release();
  });
  window.addEventListener("pageshow", sync);
  resize();
  sync();
}
