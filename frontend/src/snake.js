import React from 'react';
import { useEffect,useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios"
import './snake.css';
import './design.css';
import logo from "./snake.png" 

class SnakeGame extends React.Component{
     
   
    constructor(props){
        super(props);
       
        this.state = {
            height : 350,
            width: 350,
            snake_id:"",
            food_id:"",
            move_id:"",
            value_id:"",
            c_ctx:"",
            level : 1,
            prevTail:{x:0,y:0},
            prevFood:{x:0,y:0},
            moveReturn : 220,
            output_layer : {w:[550,100],s:[550,140],a:[550,180],d:[550,220]},
            velocitySnake : 95,
            level : 1,
            veclocityFood : 130,
            snake_direction : "right",
            currentDirection : "right",
            prev_snake_direction : "right",
            food_direction : "right",
            move_made: "d",
            food:{x:175,y:175},
            prevPos: {},
            start: true,
            snakeColor : "#8dc986",
            unit : 20,
            snake : [
       
                {x:20*4,y:75},
                {x:20*3,y:75},
                {x:20*2,y:75},
                {x:0,y:75},
                {x:0,y:75}
              ],
              data:[]
          };
          this.gameStart = this.gameStart.bind(this)
          this.moveSnake = this.moveSnake.bind(this);
          this.drawSnake = this.drawSnake.bind(this);
          this.moveFood = this.moveFood.bind(this);
          this.drawFood = this.drawFood.bind(this);
          this.handleKeys = this.handleKeys.bind(this);
          this.downloadCSV = this.downloadCSV.bind(this);
          this.Instance = this.Instance.bind(this);
          this.clearBoardSnake = this.clearBoardSnake.bind(this);
          this.clearBoardFood = this.clearBoardFood.bind(this);
          this.Ai_Make_Move = this.Ai_Make_Move.bind(this);
        
        this.StartGame= this.StartGame.bind(this);
        this.Snake_movements = this.Snake_movements.bind(this);
        // this.Move_Prediction = this.Move_Prediction.bind(this);
        this.HandleValues = this.HandleValues.bind(this);
        this.RestartGame = this.RestartGame.bind(this);
       
      
          
    } 
    clearBoardSnake(ctx){
        ctx.fillStyle= "white"
        ctx.fillRect(this.state.prevTail.x, this.state.prevTail.y, this.state.unit, this.state.unit);
    }
    clearBoardFood(ctx){
       
    }
    handleKeys = async  (event) => {
        console.log(event.key)
        if (event.key === 'ArrowUp' )this.setState((prevState) => ({prev_snake_direction:prevState.snake_direction, snake_direction: "up",move_made:"w" }));
        else if (event.key === 'ArrowDown')this.setState((prevState) => ({prev_snake_direction:prevState.snake_direction, snake_direction: "down",move_made:"s" }));
        else if (event.key === 'ArrowLeft')this.setState((prevState) => ({prev_snake_direction:prevState.snake_direction, snake_direction: "left",move_made:"a" }));
        else if (event.key === 'ArrowRight')this.setState((prevState) => ({prev_snake_direction:prevState.snake_direction, snake_direction: "right",move_made:"d" }));
        
       
        if (event.key === 'w')this.setState((prevState) => ({ food_direction: "up" }));
        else if (event.key === 'a')this.setState((prevState) => ({ food_direction: "left" }));
        else if (event.key === 's')this.setState((prevState) => ({ food_direction: "down" }));
        else if (event.key === 'd')this.setState((prevState) => ({ food_direction: "right" }));

       
        // this.state.data+=this.state.food_direction+"<br>"
      
        
   
    //   setTimeout(()=>{
    //     this.Ai_Make_Move()
    //   },50)
        
      };

      async StartGame(){
        document.getElementById("restart").style.display="none"
        document.querySelectorAll(".blackscreen")[0].style.display = "flex";
        document.getElementById("descp").style.display = "none"
        document.querySelectorAll(".design")[0].style.display = "none";
        document.getElementById("Enter").style.display = "none";
        document.getElementById("game-box").style.display = "none"
        document.getElementById("logo").style.display = "none"
        let snake = this.state.snake
        let food = this.state.food
        let count=10
        const loading = setInterval(()=>{
            document.getElementById("load2").style.width = count+"px";
            count++;
            if(count==300)count=0;
        },30)
        const data = {'snakeX' : snake[0].x,'snakeY': snake[0].y,'foodX': food.x,'foodY':food.y,'direction_snake':this.state.snake_direction,'direction_food':this.state.food_direction}
        
        const headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          };
        const response = await axios.post("http://127.0.0.1:5000/snake/move",data,{headers:headers});
            console.log("hello")
        if(response.data){
            console.log("in")
            setTimeout(()=>{
              
                document.getElementById("game-box").style.display = "flex"
                document.getElementById("descp").style.display = "none"
                document.querySelectorAll(".design")[0].style.display = "none";
               
            },1000)
          
            setTimeout(()=>{
                document.querySelectorAll(".blackscreen")[0].style.display = "none";
                document.getElementById("logo").style.display = "block"
                
                clearInterval(loading)
                this.state.start=true;
              this.gameStart(this.state.c_ctx)
            },3000)
           
        }
      }
    drawSnake(ctx){
        ctx.fillStyle = this.state.snakeColor;
        ctx.strokeStyle = this.state.snakeBorder;
       
        ctx.lineWidth = 3;
        let unit = this.state.unit
        let snake = this.state.snake
        
        snake.forEach(body_part=>{
             ctx.fillRect(body_part.x,body_part.y,unit,unit)

        })
    }
    
    RestartGame(ctx){
        document.getElementById("restart").style.display="none"
           this.state.velocitySnake=100;
           this.state.veclocityFood=140;
           this.state.moveReturn = 300;
           let prev_level = "level_"+this.state.level
           document.getElementById(prev_level).style.background = "none";
           this.state.level=1;
           let curr = "level_"+this.state.level
           document.getElementById(curr).style.backgroundColor = "#40ad94";
        this.state.snake = [
       
                {x:20*4,y:75},
                {x:20*3,y:75},
                {x:20*2,y:75},
                {x:0,y:75},
                {x:0,y:75}
              ];
        this.state.food.x = 175
        this.state.food.y = 175
        ctx.fillStyle= "white"
        ctx.fillRect(0,0,this.state.height,this.state.width)
        this.StartGame();
         
    }
    drawFood(ctx){
        ctx.fillStyle = "#ba403d";
        ctx.lineWidth = 3;
        let unit = this.state.unit
        let food = this.state.food
        ctx.fillRect(food.x,food.y,unit,unit) 
    }
    moveSnake(direction){
        let snake_copy=[]
        let itr=0;
        let unit = this.state.unit
        
         let count = this.state.snake.length-1
            this.state.snake.forEach(body_part=>{
                if(itr==0){
                    this.state.prevPos=body_part
                    if(direction == "right" )
                    snake_copy.push({x:body_part.x+unit,y:body_part.y})
                   

                    if(direction == "left")
                    snake_copy.push({x:body_part.x-unit,y:body_part.y})
                    
                    
                    if(direction == "down")
                    snake_copy.push({x:body_part.x,y:body_part.y+unit})
                    


                    if(direction == "up")
                    snake_copy.push({x:body_part.x,y:body_part.y-unit})
                   
                    
                   
                   
                }
                else if(itr == count){
                    snake_copy.push(this.state.prevPos)
                    this.state.prevTail=body_part
                }
                else{
                    snake_copy.push(this.state.prevPos)
                    this.state.prevPos=body_part
                }
                itr++;

            })
        
            
            this.state.snake = snake_copy;
            let snake = this.state.snake
            if(snake[0].x>=this.state.width){
                this.state.snake[0].x=0
             }
             if(snake[0].x<0){
                this.state.snake[0].x=this.state.width-this.state.unit
             }
             if(snake[0].y<0){
                this.state.snake[0].y=this.state.height-this.state.unit
             }
             if(snake[0].y>=this.state.width){
                this.state.snake[0].y=0
             }
        
    }
    moveFood(direction,ctx){
       
        let body_part = this.state.food
        
        let unit = this.state.unit
        ctx.fillStyle= "white"
        ctx.fillRect(this.state.food.x, this.state.food.y, this.state.unit, this.state.unit);
                    if(direction == "right" )
                    this.state.food ={x:body_part.x+unit,y:body_part.y}
                    // else if(direction == "right")  this.state.food ={x:body_part.x-unit,y:body_part.y}
                    
                    if(direction == "left" )
                    this.state.food ={x:body_part.x-unit,y:body_part.y}
                    // else if(direction == "left")  this.state.food ={x:body_part.x+unit,y:body_part.y}

                    if(direction == "down")
                    this.state.food ={x:body_part.x,y:body_part.y+unit}
                    // else if(direction == "down")  this.state.food ={x:body_part.x,y:body_part.y-unit}

                    if(direction == "up") this.state.food ={x:body_part.x,y:body_part.y-unit}
                    // else if(direction == "up")  this.state.food ={x:body_part.x+unit,y:body_part.y+unit}
                
            
            
        
    }
    gameStart(ctx){
        if(this.state.start){
           
           this.Instance(ctx);
           this.Snake_movements(ctx);
        //    this.Move_Prediction(ctx);
           this.HandleValues(ctx)
        }
    }



    
    componentDidMount(){
       
      
     
       
       
        const canvas = document.querySelector("#game_board")

        const ctx =  canvas.getContext("2d")
        this.state.c_ctx = ctx;
        ctx.fillStyle= "white"
        ctx.fillRect(0,0,this.state.width,this.state.height)
        console.log(canvas.width,canvas.height)
        document.addEventListener('keydown', this.handleKeys);
        document.getElementById("Enter").addEventListener('click', this.StartGame);
        document.getElementById("Restart").addEventListener('click', ()=>{
            if(!this.state.start)
            this.RestartGame(this.state.c_ctx)
        });
        document.getElementById("Exit").addEventListener('click', ()=>{
            document.getElementById("game-box").style.display="none"
            document.getElementById("restart").style.display="none"
            document.querySelectorAll(".design")[0].style.display="flex"
            document.getElementById("descp").style.display="block"

            document.getElementById("Enter").style.display="block"
        });
        
        
       
          
    
    
    }
    CalculateData(snake,food,prev_dir,food_direction,move_made){
        let data = snake[0].x+","+snake[0].y+","+food.x+","+food.y+","+prev_dir+","+food_direction+","+move_made
        return data
      }
     
    
    async Ai_Make_Move(){
       
        let neural = this.state.output_layer
        let snake = this.state.snake
        let food = this.state.food
        document.getElementById("s_x").textContent = snake[0].x
        document.getElementById("s_y").textContent=snake[0].y
        document.getElementById("f_x").textContent = food.x
        document.getElementById("f_y").textContent = food.y

        document.getElementById("snake_direction").textContent = this.state.snake_direction
        document.getElementById("food_direction").textContent = this.state.food_direction
        

        document.getElementById("w").classList.remove('highlighted');
        document.getElementById("a").classList.remove('highlighted');
        document.getElementById("s").classList.remove('highlighted');
        document.getElementById("d").classList.remove('highlighted');

      
                    

                   
                    const response = await axios.post("http://127.0.0.1:5000/snake/move",{snakeX : snake[0].x,snakeY: snake[0].y,foodX: food.x,foodY:food.y,direction_snake:this.state.snake_direction,direction_food:this.state.food_direction});
                    
                    console.log(response.data)
                       let direction = response.data
                       const elem = document.getElementById(direction)
                       elem.classList.add('highlighted');

                       if(direction == "w"){
                       
                      
                        this.state.snake_direction="up"
                        this.setState((prevState) => ({prev_snake_direction:prevState.snake_direction, snake_direction: "up",move_made:"w" }));
                    }
                       if(direction == "a"){
                       
                        this.state.snake_direction="left"
                        this.setState((prevState) => ({prev_snake_direction:prevState.snake_direction, snake_direction: "left",move_made:"a" }));
                    }
                       if(direction == "s"){
                       
                        this.state.snake_direction="down"
                        this.setState((prevState) => ({prev_snake_direction:prevState.snake_direction, snake_direction: "down",move_made:"s" }));
                    }
                       if(direction == "d"){
                        
                        this.state.snake_direction="right"
                        this.setState((prevState) => ({prev_snake_direction:prevState.snake_direction, snake_direction: "right",move_made:"d" }));
                    }

    }
    
    HandleValues(ctx){
       this.state.value_id = setInterval(()=>{
        let prev_level = "level_"+this.state.level
        document.getElementById(prev_level).style.background = "none";
        this.state.level+=1;
        
        let next_level = "level_"+this.state.level
        document.getElementById(next_level).style.backgroundColor = "#40ad94";
        this.state.velocitySnake-=20;
        this.state.moveReturn-=10;
        this.clearSnakeInterval();
        this.clearMoveInterval();
        this.Snake_movements(ctx);
        // this.Move_Prediction(ctx);
       },8000)
    }

    // Move_Prediction(ctx){
    //     this.state.move_id = setInterval(async ()=>{
               
    //         //    let rando_direction = ["right","down","right","left","left","right","right","right","up","left","down","up","right","left","right","up","right","down","up","down","left","down","up","left","down","right","left","left","left","down","left","up","down","right","up","down","right","down","down","up","up","up","right","right","down","right","down","up","left","left","down","right","left","left","left","down","down","down","right"]
    //         //    let len = rando_direction.length
    //         //   this.state.food_direction = rando_direction[itr%len]
             
    //             try {
                    
                      
                     
                    
    //             this.Ai_Make_Move()

                
    //               } catch (error) {
                   
    //                 // Handle the error here
    //               }
                 
              
               
                
    //         },this.state.moveReturn)

    // }
    
    clearSnakeInterval(){
        clearInterval(this.state.snake_id)
    }

    clearMoveInterval(){
        clearInterval(this.state.move_id)
    }

    
    Snake_movements(ctx){
        
         this.state.snake_id= setInterval(()=>{
              
                
            let snake = this.state.snake
             let food = this.state.food
             let unit = this.state.unit
             let snake_dir = this.state.snake_direction
             
           
            let head = snake[0]
            
             if (
                head.x < food.x + unit &&
                head.x + unit > food.x &&
                head.y < food.y + unit &&
                head.y + unit > food.y
                || this.state.moveReturn == 7
            )
            
              {
                console.log(food)
                this.state.start = false;
                document.getElementById("restart").style.display="flex"
                this.downloadCSV()
                clearInterval(this.state.move_id)
                clearInterval(this.state.food_id)
                clearInterval(this.state.snake_id)
                clearInterval(this.state.value_id)
              }
              else{
              
            this.moveSnake(this.state.snake_direction,this.state.snake_curr_dir);
            this.clearBoardSnake(ctx);
            this.drawSnake(ctx);
           
              }
            
            
            
           
            

            
            
        },this.state.velocitySnake)

    }
    downloadCSV = () => {
        
       
      const data = this.state.data
       
        const headers = Object.keys(data[0]);
    
       
        const csvContent =
          headers.join(',') +
          '\n' +
          data.map(row => headers.map(field => row[field]).join(',')).join('\n');
    
       
        const blob = new Blob([csvContent], { type: 'text/csv' });
    
        
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'data.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      CalculateData(snake,food,prev_dir,food_dir,dir_made){
        const data = {
            'snakeX' : snake[0].x,
            'snakeY': snake[0].y,
            'foodX': food.x,
            'foodY':food.y,
            'direction_snake':prev_dir,
            'direction_food':food_dir,
            'move_made':dir_made

        }
        this.state.prev_snake_direction = this.state.snake_direction

        return data
      }
    Instance(ctx){
        // function getRandomDirection() {
        //     const directions = [["up", "right", "down", "left"],["up", "left", "down", "right"],
        //     ["down", "left", "up", "right"],["down", "right", "up", "left"]];
        //     const randomIndex = Math.floor(Math.random() * directions.length);
        //     const randomIndex2 = Math.floor(Math.random() * directions[randomIndex].length);
        //     return directions[randomIndex][randomIndex2]
        //   }
        let itr = 0;
        if(this.state.start){
            let ai_data=""
            // let randomNumber = 4
           
          


            this.state.food_id = setInterval(()=>{
                
                let snake = this.state.snake
                let head = snake[0]
                let food = this.state.food
                let unit = this.state.unit
                
                if (
                    (head.x < food.x + unit &&
                    head.x + unit > food.x &&
                    head.y < food.y + unit &&
                    head.y + unit > food.y)
                     || (food.x <-unit || food.x>=350 || food.y<-unit || food.y>=350)

                     || this.state.moveReturn == 7
                )
                {
                  console.log(food)
                  this.state.start = false;
                  document.getElementById("restart").style.display="flex"
                  this.downloadCSV()
                  clearInterval(this.state.move_id)
                  clearInterval(this.state.food_id)
                  clearInterval(this.state.snake_id)
                  clearInterval(this.state.value_id)

                }
                this.moveFood(this.state.food_direction,ctx);
                this.state.data.push(this.CalculateData(snake,food,this.state.prev_snake_direction,this.state.food_direction,this.state.move_made))

                this.clearBoardFood(ctx);
                this.drawFood(ctx);
            },this.state.veclocityFood)



            
            
        }
    }

      

   
    

  
render(){
  return (
    <div id="game-cont">
        <img id="logo" src={logo}></img>
        <div id="loading_game" className="loading_game">
            <div className = "blackscreen">
            <img src={logo}></img>
            <div id="load2">

             </div>
            </div>
        </div>
     <div className="design">

     
        <div className="des_1"></div>
        <div className="des_2"></div>
        <div className="des_3"></div>
        <div className="des_4"></div>
        <div className="des_5"></div>
        <div className="des_6"></div>
        <div className="des_7"></div>
    </div>
       
        
        <div id="descp" className="description">
        Snake AI is a extension fo the classical snake game developed by Taneli Armanto in 1997.
        However, this version of the game is a whole other concept developed on the basis of AI.
        In this game we as the player are in control of the food particle rather than the snake itself.
        The task as a player is to escape the clutches of the snake without exceeding the boundaries.
        The snake is programmed using Artificial Neural Networks(ANN) to track down the food particle by making cognitive 
        and optimal moves based on the algorithm. The model being used to control the snake currently has a an accuracy
        of 90.89 percent based on the data collected by training the snake to hunt down the particle several times.
        <br></br>
        <br></br>
        <span style={{fontSize : "120%",color:"grey"}}>Note : The model is still being placed under continous training for the 
        the snake to adapt to the food particle and imporve its accuracy </span>
        </div>
       
    <button id="Enter">START</button>
   
    <div id="game-box" className="game-box">
    <div className="levels">
        <div id="level_1" className="level">LEVEL 1 (Easy)<br></br> 0.5x</div>
        <div id="level_2"  className="level">LEVEL 2 (Intermediate)<br></br> 1x</div>
        <div id="level_3" className="level">LEVEL 3 (VETERAN)<br></br> 1.5x</div>
        <div id="level_4" className="level">LEVEL 4 (BEYOND)<br></br> 2.0x</div>
        <div id="level_5" className="level">LEVEL 5 (GODLIKE)<br></br> 2.5x</div>
        <div id="level_6" className="level">LEVEL 6(UNREACHABLE)<br></br> 3x</div>
    </div>
    <div style={{width:'100%',display:'flex',justifyContent:'center',gap:'5%',marginTop:'5%'}}>

   
    <div id="neural" className="network">
        <svg width="100%" height="100%">
           
            <circle cx="50" cy="50" r="10" fill="blue" />
            <circle cx="50" cy="100" r="10" fill="blue" />
            <circle cx="50" cy="150" r="10" fill="blue" />
            <circle cx="50" cy="200" r="10" fill="blue" />
            <circle cx="50" cy="250" r="10" fill="blue" />
            <circle cx="50" cy="300" r="10" fill="blue" />
            
            <line x1="50" y1="50" x2="150" y2="75" />
            <line x1="50" y1="50" x2="150" y2="175" />

            <line x1="50" y1="100" x2="150" y2="125" />
            <line x1="50" y1="100" x2="150" y2="225" />

            <line x1="50" y1="150" x2="150" y2="275" />
            <line x1="50" y1="150" x2="150" y2="275" />

            <line x1="50" y1="200" x2="150" y2="275" />
            <line x1="50" y1="200" x2="150" y2="225" />

            <line x1="50" y1="250" x2="150" y2="175" />

            <line x1="50" y1="300" x2="150" y2="275" />
           
            
          
            <circle cx="150" cy="75" r="10" fill="#8dc986" />
            <circle cx="150" cy="125" r="10" fill="#8dc986" />
            <circle cx="150" cy="175" r="10" fill="#8dc986" />
            <circle cx="150" cy="225" r="10" fill="#8dc986" />
            <circle cx="150" cy="275" r="10" fill="#8dc986" />
            
            <line x1="150" y1="75" x2="250" y2="75" />
            <line x1="150" y1="75" x2="250" y2="175" />

            <line x1="150" y1="125" x2="250" y2="125" />
            <line x1="150" y1="125" x2="250" y2="225" />

            <line x1="150" y1="175" x2="250" y2="275" />
            <line x1="150" y1="175" x2="250" y2="275" />

            <line x1="150" y1="225" x2="250" y2="275" />
            <line x1="150" y1="225" x2="250" y2="225" />

            <line x1="150" y1="275" x2="250" y2="175" />
            <line x1="150" y1="275" x2="250" y2="275" />




            <circle cx="250" cy="75" r="10" fill="green" />
            <circle cx="250" cy="125" r="10" fill="green" />
            <circle cx="250" cy="175" r="10" fill="green" />
            <circle cx="250" cy="225" r="10" fill="green" />
            <circle cx="250" cy="275" r="10" fill="green" />
           
            <line x1="250" y1="75" x2="450" y2="100" />
            <line x1="250" y1="75" x2="450" y2="150" />

            <line x1="250" y1="125" x2="450" y2="150" />
            <line x1="250" y1="125" x2="450" y2="200" />

            <line x1="250" y1="175" x2="450" y2="250" />
            <line x1="250" y1="175" x2="450" y2="100" />

            <line x1="250" y1="225" x2="450" y2="200" />
            <line x1="250" y1="225" x2="450" y2="250" />

            <line x1="250" y1="275" x2="450" y2="250" />
          
            <circle id="w" cx="450" cy="100" r="20" fill="red" />
            <circle id="a" cx="450" cy="150" r="20" fill="red" />
            <circle id="s" cx="450" cy="200" r="20" fill="red" />
            <circle id="d" cx="450" cy="250" r="20" fill="red" />

            <text x="500" y="100">Up</text>
            <text x="500" y="150">left</text>
            <text x="500" y="200">Down</text>
            <text x="500" y="250">right</text>

            <text id="s_x" x="28" y="30">Snake_X</text>
            <text id="s_y" x="28" y="80">Snake_Y</text>
            <text id="f_x" x="28" y="130">Food_X</text>
            <text id="f_y" x="28" y="180">Food_Y</text>
            <text id="snake_direction" x="28" y="230">Direc_S</text>
            <text id="food_direction" x="28" y="280">Direc_F</text>

            <text x="250" y="350">ARTIFICIAL NEURAL NETWORK</text>
        </svg>
    </div>
    
        <canvas  id="game_board" width="350" height ="350"/>
        </div>
        <div id="restart">
        <button id="Restart">RESTART</button>
        <button id="Exit">Exit</button>
        
        </div>
    </div>
</div>
  );
  }
};

export default SnakeGame;
