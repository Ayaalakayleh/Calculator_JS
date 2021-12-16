class CalculatorEngine{
   constructor(){
       this.Number1  = ''; 
       this.Number2  = ''; 
       this.Operator = '';
    }
    setNumber = (num) =>{
        if(this.Operator != ''){
            this.Number2 += num;
            return this.Number2;
        }else{
            this.Number1 += num;
            return this.Number1;
        }   
    }
    setOperator = (operator) =>{
        this.Operator = operator;
        return this.Operator;
    }
    calculate = () => {
        if(this.Operator == '+'){
            this.result =  parseInt(this.Number1) + parseInt(this.Number2);
        }if(this.Operator == '-'){
            this.result =  parseInt(this.Number1) - parseInt(this.Number2);
        }
        if(this.Operator == '*'){
            this.result =  parseInt(this.Number1) * parseInt(this.Number2);
        }
        if(this.Operator == '/' || this.Operator == '÷'){
            this.result =  parseInt(this.Number1) / parseInt(this.Number2);
        }
        if(this.Operator == '%'){
            this.result =  parseInt(this.Number1) % parseInt(this.Number2);
        }
        return this.result;
    } 
}

class CalculatorUI {
    constructor(){
        this.engine = new CalculatorEngine();
        this.numberButtonEL   = null;
        this.operatorButtonEL = null;
        this.equalButtonEL    = null;
        this.displayResultEL  = null;
        this.clearButtonEL    = null;  
        this.logButtonEL      = null; 
        this.selectEL         = null;
    }
    init = () => {
        this.numberButtonEL    = document.getElementsByClassName('number-button');
        this.operatorButtonEL  = document.getElementsByClassName('operator-button');
        this.equalButtonEL     = document.getElementsByClassName('equal-button')[0];
        this.displayResultEL   = document.getElementsByClassName('display-result')[0];  
        this.clearButtonEL     = document.getElementsByClassName('clear-button')[0];
        this.logButtonEL       = document.getElementsByClassName('log-button')[0];
        this.selectEL          = document.getElementsByClassName('display-Last-result')[0];
        
        for(let i=0; i<this.numberButtonEL.length; i++){
            this.numberButtonEL[i].addEventListener('click', this.onNumberButtonClick);
        }
        for(let i=0; i<this.operatorButtonEL.length; i++){
            this.operatorButtonEL[i].addEventListener('click', this.onOperatorButtonClick ) ;
        }
        this.equalButtonEL.addEventListener('click', this.onEqualButtonClick ) ;  
        this.clearButtonEL.addEventListener('click', this.onClearButtonClick );
        this.logButtonEL.addEventListener('click', this.onLogButtonClick);
    }

    onNumberButtonClick = numberButtonEL => {
        this.number = numberButtonEL.target.dataset.number;
        let n = this.engine.setNumber(this.number);
        this.display(n) ;
    }

    onOperatorButtonClick = (operatorButtonEL) => {      
        let Op = operatorButtonEL.target.dataset.number;
        let o = this.engine.setOperator(Op); 
        this.display(o) ;
    } 

    onEqualButtonClick = () => {
       let equal = this.engine.calculate();
       this.display(equal) ;

        // // JSON ====
        let obj = [{number1:this.engine.Number1, number2:this.engine.Number2, operator:this.engine.Operator, result:this.engine.result}];
        let str = JSON.stringify(obj);
        let logArraay = JSON.parse(str);
                
        // // Fill list result From log array ...
        let newOptionEL = document.createElement("option");
        let node = document.createTextNode(logArraay[0].number1+' '+ logArraay[0].operator+' '+ logArraay[0].number2+ " = " + logArraay[0].result);
        newOptionEL.appendChild(node);
        this.selectEL.appendChild(newOptionEL); 
    }

    onClearButtonClick = () => {
        this.display('');
        this.engine.Number1 = '';
        this.engine.Number2 = '';
        this.engine.Operator = '';
    }  

    display = (str) =>{
        this.displayResultEL.innerHTML = str;
    } 

    onLogButtonClick = () => {
        if( this.selectEL.style.display == 'inline' ){
            this.selectEL.style.display = 'none';
        }else{
            this.selectEL.style.display = 'inline';
        }
    } 
    
}

let obj = new CalculatorUI();
obj.init();
