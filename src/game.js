let game = new Game()
game.score = 0
game.speed = INTERVAL
game.key = true
game.arr=[]
game.timer1 = null
game.timer2 = null
game.toisonKey = true
game.transferArr=[]
game.init=function(snake){
    ground.init()
    snake.init(ground)
    this.createFood(ground)
    function directionKey(e){
        console.log(e)
        if(e.which == 38 && snake.direction != movement.Bottom){
            snake.direction =movement.Top
        }else if(e.which == 40 && snake.direction != movement.Top){
            snake.direction = movement.Bottom
        }else if(e.which == 39 && snake.direction != movement.Left){
            snake.direction = movement.Right
        }else if(e.which == 37 && snake.direction != movement.Right){
            snake.direction = movement.Left
        }
    }
    document.onkeydown=debounce(directionKey,100)
}

game.begin=function(){
    clearInterval(this.timer1)
    this.timer1 = setInterval(function(){
        snake.move(ground)
    },this.speed)
    console.log(this.toisonKey)
    if(this.toisonKey){
        setTimeout(()=>{
            this.createToison(ground)
            this.toisonKey = false
        },5000)
    }

}
game.over = function(){
    clearInterval(this.timer)
    clearInterval(this.timer1)
    alert('siqiaoqiao'+'    '+this.score)
    game.init(snake)
    game.begin()
}
game.createFood=function(ground){
    this.arr = []
  ground.squareArr.forEach(ele=>{
       let c =  ele.filter(ele=>{
           return ele.oType == 'floor'
        })
      if(c[0]){
          this.arr.push(c)
      }

    })
   let x = Math.floor( Math.random() * this.arr.length );
    this.arr.forEach((ele,i)=>{
        if(i == x){
            let y = Math.floor( Math.random() * ele.length );
            let newFood = Square.cerate('Food',ele[y].x,ele[y].y,'url(./img/food.png)')
            ground.remove(ele[y].x,ele[y].y)
            ground.add(newFood)
            delete this.arr[x][y]
            return
        }

    })

}
game.createToison=function(ground){
    let x = Math.floor( Math.random() * this.arr.length );
    this.arr.forEach((ele,i)=>{
        if(i == x){
            let y = Math.floor( Math.random() * ele.length );
            let newTison = Square.cerate('Toison',ele[y].x,ele[y].y,'url(./img/to.png)')
            ground.remove(ele[y].x,ele[y].y)
            ground.add(newTison)
            delete this.arr[x][y]
            return
        }
    })
}
game.createTransfer=function(ground){
    this.transferArr=[]
    for(let i=0;i<2;i++){
        let x = Math.floor( Math.random() * this.arr.length );
        this.arr.forEach((ele,i)=>{
            if(i == x){
                let y = Math.floor( Math.random() * ele.length );
                let newTransfer = Square.cerate('Transfer',ele[y].x,ele[y].y)
                ground.remove(ele[y].x,ele[y].y)
                ground.add(newTransfer)
                this.transferArr.push(newTransfer);
                delete this.arr[x][y]
                return
            }
        })
    }

}

game.init(snake)
game.begin()