/**
 * Coyota.js
 * 
 * Version: 1.0.0
 * Author: Jonathan Ayala
 * Created: 01/19/2018
 * Last update: 01/21/2018
 */

import { Collisions, Polygon, Circle} from '../../../lib/Collisions/Collisions.js'

let paddle  = new Polygon(32, 115, [[-5, -20], [5, -20], [5, 20], [-5, 20]])
let cpu     = new Polygon(290, 145, [[-5, -20], [5, -20], [5, 20], [-5, 20]])
let ball    = new Circle(160, 120, 5)

ball.speed = {
    x: 5,
    y: 3
}

    OnStart(() =>{
        screen.create(320, 240)

        collisionManager.insert(ball)
        collisionManager.insert(paddle)
        collisionManager.insert(cpu)
    })
    
    Always(()=>{
        Draw()

        // Kepp ball bouncing on screen
        if(ball.x < ViewportLeft() || ball.x > ViewportRight()){
            ball.speed.x *= -1
        }
        if(ball.y < ViewportTop() || ball.y > ViewportBottom()){
            ball.speed.y *= -1
        }

        // Check for ball collision
        if(ball.collides(paddle, result) || ball.collides(cpu, result)){

            if(result.overlap_x < 0){
                ball.speed.x = 5
            }
            else if(result.overlap_x > 0){
                ball.speed.x = -5
            }

            else if(result.overlap_y < 0){
                ball.speed.y = 3
            }
            else if(result.overlap_y > 0){
                ball.speed.y = -3
            }
        }


        // Move paddles
        if(ball.speed.x > 0){
            if(ball.y > cpu.y){
                cpu.y+=3
            }
            else{
                cpu.y-=3
            }
        }
        else{
            if(ball.y > paddle.y){
                paddle.y+=3
            }
            else{
                paddle.y-=3
            }
        }

        // Move ball
        ball.x += ball.speed.x
        ball.y += ball.speed.y
    })

    function Draw(){

        for(let i = 20; i < screen.height; i+=20){
            screen.drawRect(screen.width/2-5, i, 5, 5, "white")
        }

        DrawObject(ball)
        DrawObject(paddle)
        DrawObject(cpu)
    }