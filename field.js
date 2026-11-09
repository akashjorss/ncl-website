import { weightsAt } from "./field-mix.js";
import { createFlow } from "./field-flow.js";

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
uniform sampler2D u_dye;
const vec3 NIGHT=vec3(.010,.034,.062);
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*f*(f*(f*6.-15.)+10.);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float n=0.,a=.5;for(int i=0;i<4;i++){n+=a*noise(p);p=mat2(.8,.6,-.6,.8)*p*2.03+5.7;a*=.5;}return n;}
float line(float p,float width){float d=abs(fract(p+.5)-.5);return 1.-smoothstep(width,width+max(fwidth(p),.0001),d);}
vec3 sensor(vec2 uv,vec2 point){
 vec2 d=(uv-point)*u_resolution;float r=length(d);float size=clamp(u_resolution.x/1100.,.85,1.35);
 float core=1.-smoothstep(.8*size,1.65*size,r);
 float halo=exp(-r*r/(22.*size*size))*.21;
 float ring=(1.-smoothstep(.2*size,.8*size,abs(r-4.8*size)))*.13;
 return vec3(.78,.95,.95)*core+vec3(.22,.63,.67)*(halo+ring);
}
void main(){
 vec2 uv=gl_FragCoord.xy/u_resolution;
 // The same transported scalars support all four views, including during blends.
 vec3 d=texture2D(u_dye,uv).rgb;
 vec2 texel=vec2(1./768.,1./384.);
 vec3 left=texture2D(u_dye,uv-vec2(texel.x,0.)).rgb;
 vec3 right=texture2D(u_dye,uv+vec2(texel.x,0.)).rgb;
 vec3 bottom=texture2D(u_dye,uv-vec2(0.,texel.y)).rgb;
 vec3 top=texture2D(u_dye,uv+vec2(0.,texel.y)).rgb;
 vec2 gradient=vec2(right.r-left.r,top.r-bottom.r);
 float carrier=d.r;
 float ribbon=line(carrier*86.,.045);
 float filament=line(carrier*192.,.025);
 float body=pow(.5+.5*sin(carrier*125.),5.);
 float density=d.b*(.07+body*.28+ribbon*.40);
 float edge=length(gradient);
 float light=clamp(.72+dot(normalize(vec3(-gradient*180.,1.)),normalize(vec3(-.45,.65,.8)))*.4,.4,1.15);
 float depth=fbm(uv*vec2(5.3,3.7)+vec2(-u_time*.006,u_time*.002));
 float fine=fbm(uv*vec2(85.,48.)+vec2(-u_time*.014,0.));
 vec3 ice=vec3(.46,.69,.70),teal=vec3(.055,.29,.34),copper=vec3(.61,.35,.16);
 float envelope=smoothstep(.025,.42,d.b);
 float transmission=1.-exp(-density*4.8);
 // Absorption through dye sheets and grazing light give the flow depth.
 vec3 fluid=ice*transmission*light*(.54+.22*depth)+teal*d.b*.20;
 fluid+=ice*filament*d.b*.25+teal*fine*density*.12;
 fluid+=copper*transmission*.11*smoothstep(.3,.75,d.g);
 float curlLines=line(carrier*132.+d.b*.35,.024)*envelope;
 vec3 vortical=mix(teal,ice,.68)*(curlLines*.55+transmission*.22)+ice*filament*d.b*.13;
 float heat=smoothstep(.1,.72,d.g);
 vec3 thermal=teal*(1.-heat)*envelope*.44+copper*pow(heat,1.4)*(.7+.3*depth);
 thermal+=ice*length(vec2(right.g-left.g,top.g-bottom.g))*.28;
 float scalar=d.b*.8+d.g*.25;
 float minor=line(scalar*30.,.017),major=line(scalar*7.5,.012);
 vec3 contours=mix(teal,ice,.45)*(minor*.43+major*.52)*smoothstep(.025,.2,scalar);
 contours+=teal*envelope*.035;
 vec3 color=fluid*u_mix.x+vortical*u_mix.y+thermal*u_mix.z+contours*u_mix.w;
 float vignette=1.-.50*smoothstep(.25,.84,length((uv-.5)*vec2(1.,1.2)));
 color=NIGHT+color*vignette;
 color+=sensor(uv,vec2(.14,.68));color+=sensor(uv,vec2(.30,.32));
 color+=sensor(uv,vec2(.43,.78));color+=sensor(uv,vec2(.61,.45));
 color+=sensor(uv,vec2(.78,.71));color+=sensor(uv,vec2(.88,.25));
 gl_FragColor=vec4(color,1.);
}`;
  let simulation,
    simulationTime = 0,
    program,
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
        ["resolution", "time", "mix", "dye"].map((name) => [
          name,
          gl.getUniformLocation(program, "u_" + name),
        ]),
      );
      simulation = createFlow(gl, buffer, vertexSource);
      if (!simulation) throw new Error("Flow texture is unavailable");
      shell.dataset.precision = simulation.precision;
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
    if (simulation) simulation.dispose();
    simulation = null;
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
    buffer = program = null;
    shell.dataset.ready = "false";
  }
  function draw(now) {
    if (!program || lost || disposed) return;
    const seconds = still || reduced.matches ? 6 : (now - started) / 1000;
    simulation.step(Math.max(0, seconds - simulationTime), seconds);
    simulationTime = seconds;
    gl.useProgram(program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, simulation.texture);
    gl.uniform1i(uniforms.dye, 0);
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
