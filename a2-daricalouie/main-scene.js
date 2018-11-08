window.Assignment_Two_Test = window.classes.Assignment_Two_Test =
class Assignment_Two_Test extends Scene_Component
  { constructor( context, control_box )     // The scene begins by requesting the camera, shapes, and materials it will need.
      { super(   context, control_box );    // First, include a secondary Scene that provides movement controls:
        if( !context.globals.has_controls   ) 
          context.register_scene_component( new Movement_Controls( context, control_box.parentElement.insertCell() ) ); 

        context.globals.graphics_state.camera_transform = Mat4.look_at( Vec.of( 0,10,20 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) );
        this.initial_camera_location = Mat4.inverse( context.globals.graphics_state.camera_transform );

        const r = context.width/context.height;
        context.globals.graphics_state.projection_transform = Mat4.perspective( Math.PI/4, r, .1, 1000 );

        const shapes = { torus:  new Torus( 15, 15 ),
                         torus2: new ( Torus.prototype.make_flat_shaded_version() )( 15, 15 ),
                         'sphere4': new Subdivision_Sphere(4),
                         'flatSphere2': new (Subdivision_Sphere.prototype.make_flat_shaded_version() )(2),
                         'sphere3': new Subdivision_Sphere(3),
                         'sphere1': new (Subdivision_Sphere.prototype.make_flat_shaded_version() )(1),
                         'torSphere': new Grid_Sphere(10,10)

                     
                                // TODO:  Fill in as many additional shape instances as needed in this key/value table.
                                //        (Requirement 1)
                       }
        this.submit_shapes( context, shapes );
                                     
                                     // Make some Material objects available to you:
        this.materials =
          { test:     context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ), { ambient:.2 } ),
            ring:     context.get_instance( Ring_Shader  ).material(),
            'sun':    context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ), { ambient:1 } ),
            'planet1': context.get_instance( Phong_Shader ).material( Color.of( 0.4,0.5,0.5,1 ), { diffuse:1 } ),
            'planet2': context.get_instance( Phong_Shader ).material( Color.of( 0,0.5,0.5,1 ), { specular:1, diffuse:0.2 } ),
            'planet3': context.get_instance( Phong_Shader ).material( Color.of( 1,0.5,0,1 ), { specular:1, diffuse:1 } ),
            'planet4': context.get_instance( Phong_Shader ).material( Color.of( 0,0,1,1 ), { specular:1} )

                                // TODO:  Fill in as many additdional material objects as needed in this key/value table.
                                //        (Requirement 1)
          }

        this.lights = [ new Light( Vec.of( 5,-10,5,1 ), Color.of( 0, 1, 1, 1 ), 1000 ) ];
      }
    make_control_panel()            // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
      { this.key_triggered_button( "View solar system",  [ "0" ], () => this.attached = () => this.initial_camera_location );
        this.new_line();
        this.key_triggered_button( "Attach to planet 1", [ "1" ], () => this.attached = () => this.planet_1 );
        this.key_triggered_button( "Attach to planet 2", [ "2" ], () => this.attached = () => this.planet_2 ); this.new_line();
        this.key_triggered_button( "Attach to planet 3", [ "3" ], () => this.attached = () => this.planet_3 );
        this.key_triggered_button( "Attach to planet 4", [ "4" ], () => this.attached = () => this.planet_4 ); this.new_line();
        this.key_triggered_button( "Attach to planet 5", [ "5" ], () => this.attached = () => this.planet_5 );
        this.key_triggered_button( "Attach to moon",     [ "m" ], () => this.attached = () => this.moon     );
      }
      sunGrowth(t){
        t = 0.5+0.5*Math.sin(0.2*Math.PI*t);
        return t;
      }
    display( graphics_state )
      { let sun_transform =Mat4.identity();
        let planet1_transform = Mat4.identity();
        let planet2_transform = Mat4.identity();
        let planet3_transform = Mat4.identity();
        let planet4_transform = Mat4.identity();
        let moon_transform = Mat4.identity();
        let planet5_transform = Mat4.identity();

        graphics_state.lights = this.lights;        // Use the lights stored in this.lights.
        const t = graphics_state.animation_time / 1000, dt = graphics_state.animation_delta_time / 1000;
        
        

        // TODO:  Fill in matrix operations and drawing code to draw the solar system scene (Requirements 2 and 3)
        sun_transform = sun_transform.times(Mat4.scale([1+2*this.sunGrowth(t),1+2*this.sunGrowth(t),1+2*this.sunGrowth(t)]));
        this.scolor = Color.of(this.sunGrowth(t),0,(1-this.sunGrowth(t)),1);
        this.lights = [  new Light( Vec.of(  0,0,0,1 ),  this.scolor, 10**(1+2*this.sunGrowth(t))) ];

        this.shapes.sphere4.draw( graphics_state, sun_transform, this.materials.sun.override({color: this.scolor}) );
        planet1_transform = planet1_transform.times(Mat4.rotation(0.5*t,Vec.of( 0,1,0 )));
        planet2_transform = planet2_transform.times(Mat4.rotation(0.45*t,Vec.of( 0,1,0 )));
        planet3_transform = planet3_transform.times(Mat4.rotation(0.41*t,Vec.of( 0,1,0 )));
        planet4_transform = planet4_transform.times(Mat4.rotation(0.37*t,Vec.of(0,1,0)));
        planet5_transform = planet5_transform.times(Mat4.rotation(0.3*t,Vec.of(0,1,0)));

        planet1_transform = planet1_transform.times(Mat4.translation([5,0,0]));
        planet2_transform = planet2_transform.times(Mat4.translation([8,0,0]));
        planet3_transform = planet3_transform.times(Mat4.translation([11,0,0]));
        planet4_transform = planet4_transform.times(Mat4.translation([14,0,0]));
        planet5_transform = planet5_transform.times(Mat4.translation([17,0,0]));

        moon_transform = planet4_transform.times(Mat4.rotation(0.6*t,Vec.of(0,1,0)));
        moon_transform = moon_transform.times(Mat4.translation([2,0,0]));



        planet1_transform = planet1_transform.times(Mat4.rotation(0.5*t,Vec.of( 0,1,0 )));
        planet2_transform = planet2_transform.times(Mat4.rotation(0.45*t,Vec.of( 0,1,0 )));
        planet3_transform = planet3_transform.times(Mat4.rotation(0.41*t,Vec.of( 0.7,1,0 )));
        planet4_transform = planet4_transform.times(Mat4.rotation(0.37*t,Vec.of( 0,1,0 )));
        moon_transform = moon_transform.times(Mat4.rotation(0.25*t,Vec.of( 0,1,0 )));
        planet5_transform = planet5_transform.times(Mat4.rotation(0.37*t,Vec.of( 0,1,0 )));

        this.planet_1 = planet1_transform;
        this.planet_2 = planet2_transform;
        this.planet_3 = planet3_transform;
        this.planet_4 = planet4_transform;
        this.moon = moon_transform;
        this.planet_5 = planet5_transform;

        if(this.attached){
          let blending_factor = 0.1;
          let desired = Mat4.inverse(this.attached().times(Mat4.translation([0,0,5])));
          graphics_state.camera_transform = desired.map( (x,i) => Vec.from( graphics_state.camera_transform[i] ).mix( x, blending_factor) );
        }

        this.shapes.flatSphere2.draw( graphics_state, planet1_transform, this.materials.planet1 );
        if(Math.round(t)%2==0){
                  this.shapes.sphere3.draw( graphics_state, planet2_transform, this.materials.planet2 );
        }else{
                  this.shapes.sphere3.draw( graphics_state, planet2_transform, this.materials.planet2.override({gouraud:1}) );

        }
        this.shapes.sphere4.draw( graphics_state, planet3_transform, this.materials.planet3);
        planet3_transform = planet3_transform.times(Mat4.scale([1,1,0.2]));
        this.shapes.ring.draw(graphics_state,planet3_transform,this.materials.planet3);
        this.shapes.sphere4.draw( graphics_state, planet4_transform, this.materials.planet4);
        this.shapes.sphere1.draw( graphics_state, moon_transform, this.materials.planet2);
        this.shapes.torSphere.draw( graphics_state, planet5_transform, this.materials.planet3.override({color: Color.of(0.6,0.7,0.6,1)}));



       
        
      }
  }


// Extra credit begins here (See TODO comments below):

window.Ring_Shader = window.classes.Ring_Shader =
class Ring_Shader extends Shader              // Subclasses of Shader each store and manage a complete GPU program.
{ material() { return { shader: this } }      // Materials here are minimal, without any settings.
  map_attribute_name_to_buffer_name( name )       // The shader will pull single entries out of the vertex arrays, by their data fields'
    {                                             // names.  Map those names onto the arrays we'll pull them from.  This determines
                                                  // which kinds of Shapes this Shader is compatible with.  Thanks to this function, 
                                                  // Vertex buffers in the GPU can get their pointers matched up with pointers to 
                                                  // attribute names in the GPU.  Shapes and Shaders can still be compatible even
                                                  // if some vertex data feilds are unused. 
      return { object_space_pos: "positions" }[ name ];      // Use a simple lookup table.
    }
    // Define how to synchronize our JavaScript's variables to the GPU's:
  update_GPU( g_state, model_transform, material, gpu = this.g_addrs, gl = this.gl )
      { const proj_camera = g_state.projection_transform.times( g_state.camera_transform );
                                                                                        // Send our matrices to the shader programs:
        gl.uniformMatrix4fv( gpu.model_transform_loc,             false, Mat.flatten_2D_to_1D( model_transform.transposed() ) );
        gl.uniformMatrix4fv( gpu.projection_camera_transform_loc, false, Mat.flatten_2D_to_1D(     proj_camera.transposed() ) );
      }
  shared_glsl_code()            // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
    { return `precision mediump float;
              varying vec4 position;
              varying vec4 center;
      `;
    }
  vertex_glsl_code()           // ********* VERTEX SHADER *********
    { return `
        attribute vec3 object_space_pos;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_transform;

        void main()
        { 
        gl_Position = vec4(object_space_pos, 1.0);  
        }`;           // TODO:  Complete the main function of the vertex shader (Extra Credit Part II).
    }
  fragment_glsl_code()           // ********* FRAGMENT SHADER *********
    { return `
        void main()
        { 
          let shapeColor = Color.of(1,0,0,1);
          gl_FragColor = vec4( shapeColor.xyz , shapeColor.w );


        }`;           // TODO:  Complete the main function of the fragment shader (Extra Credit Part II).
    }
}

window.Grid_Sphere = window.classes.Grid_Sphere =
class Grid_Sphere extends Shape           // With lattitude / longitude divisions; this means singularities are at 
  { constructor( rows, columns)             // the mesh's top and bottom.  Subdivision_Sphere is a better alternative.
      { super( "positions", "normals", "texture_coords" );
        

                      // TODO:  Complete the specification of a sphere with lattitude and longitude lines
                      //        (Extra Credit Part III)
        const circle_points = Array( rows ).fill( Vec.of( 0,0,1 ) )
                                           .map( (p,i,a) => Mat4.translation([ 0,0,0 ])
                                                    .times( Mat4.rotation( i/(a.length-1) *Math.PI, Vec.of( 0,-1,0 ) ) )
                                                    .times( p.to4(1) ).to3() );

        Surface_Of_Revolution.insert_transformed_copy_into( this, [ rows, columns, circle_points ] );  

      } }