varying vec2 v_uv;

 // get the texture from the program
uniform sampler2D colormap;
uniform vec3 red;
void main()
{
    gl_FragColor = texture2D(colormap, v_uv)+vec4(red,1);
}