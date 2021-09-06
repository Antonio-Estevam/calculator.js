 class CalcController {
     
     constructor(){

            this._operation = [];
            this._locale = 'pt-BR';
            this._displayCalcEl = document.querySelector("#display");
            this._dateEl = document.querySelector("#data");
            this._timeEl = document.querySelector("#hora");
            this._currentData;
            this.initialize();
            this.iniButtonsEvents();
     }

     initialize(){

        this.setDisplayDateTime();

        setInterval(()=>{            
            this.setDisplayDateTime();
        },1000);

     }

     addEventListenerAll(element, events, fn){
        //adiciona varios eventos ao elemento
        events.split(' ').forEach(event =>{
            element.addEventListener(event,fn,false);
        });

     }

     clearAll(){
         this._operation = [];
     }

     clearEntry(){
         this._operation.pop();
     }

     getLastOperation(){
         return this._operation[this._operation.length - 1];
     }

     setLastoperation(value){
        this._operation[this._operation.length - 1] = value;
     }

     isOperator(value){

        return (['+','-','*','%','/'].indexOf(value) > -1);
     }

     pushOperation(value){

        this._operation.push(value);

        if(this._operation.length > 3){
            console.log(this._operation);
        }

     }

     addOperation(value){

         if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){

                this.setLastoperation(value);

            }else if(isNaN(value)){

            }
            else{
                this.pushOperation(value);
            }

         }else{

            if (this.isOperator(value)){

                this.pushOperation(value);

            } else {
                
               let newValue = this.getLastOperation().toString() + value.toString();            
               this.setLastoperation(parseInt(newValue));

            }

         }
         console.log(this._operation);
     }

     setError(){
         this.displayCalc = "Error"
        }

     execBtn(value){
         switch (value){
             case 'ac' : 
                this.clearAll();
                break; 

             case 'ce' : 
                this.clearEntry();
                break; 

             case 'soma' : 
                this.addOperation('+');
                break;  

             case 'subtracao' : 
             this.addOperation('-');
             break;
             
             case 'divisao' : 
             this.addOperation('/');
                break; 

             case 'multiplicacao' : 
             this.addOperation('*');
                break;  

             case 'porcento' : 
             this.addOperation('%');
                break; 

             case 'igual' : 

                break; 
              
             case 'ponto':
                this.addOperation('.');
                 break;   
             
             case '0':   
             case '1':   
             case '2':   
             case '3':   
             case '4':   
             case '5':   
             case '6':   
             case '7':   
             case '8':   
             case '9':
                 this.addOperation(parseInt(value));                   
                break; 

            default:  
                this.setError();
                break;     
         }
     }

     iniButtonsEvents(){
         let buttons = document.querySelectorAll("#buttons > g, #parts > g");

         buttons.forEach((btn, index) =>{
            this.addEventListenerAll(btn,"click drag", e => {

                let textBtn = btn.className.baseVal.replace("btn-","");

                this.execBtn(textBtn);
                
            });

            this .addEventListenerAll(btn,"mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            })
         })
     }

     setDisplayDateTime(){
        this.displayDate = this.currentData.toLocaleDateString(this._locale,{
            day:"2-digit",
            month:"short",
            year: "numeric"

        });
        this.displayTime = this.currentData.toLocaleTimeString(this._locale);
     }

     get displayTime(){
         return this._timeEl.innerHTML;
     }

     set displayTime(value){
         return this._timeEl.innerHTML = value;
     }     
     get displayDate(){
        return this._dateEl.innerHTML;
     }
     set displayDate(value){
        return this._dateEl.innerHTML = value;
     }

     get displayCalc(){
         return this._displayCalcEl.innerHTML; 
     }

     set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
     }

     get currentData(){
         return new Date();
     }

     set currentData(value){
         this._currentData = (value)
     }
     
 }