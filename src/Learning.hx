class Learning{
    private var myStrings:Array<String> = [];

    public function new(){
        trace('Created a new learning class!');
    }
    public function addElement(element:String){
        trace('Adding : '+element);
        myStrings.push(element);
    }
    public function checkElements(){
        for(element in myStrings){
            trace(element);
        }
    }
}