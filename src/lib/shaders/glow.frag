uniform vec3 glowColor;
varying float intensity;
void main() 
{
	vec3 glow = glowColor * intensity;
    vec3 inverted = 1.0 - glow;
    gl_FragColor = vec4( inverted, 1.0);
}