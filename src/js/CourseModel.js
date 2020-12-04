class CourseModel{
    constructor(name="Inget namn",comments=[], deadlines=[]){
        this.name=name;
        this.comments=comments;
        this.deadlines=deadlines;
        this.subscribers=[];
   }

   addComment(comment){
     this.comments=[comment, ...this.comments];
     this.notifyObservers();
   }

  addDeadline(nameTask,date){
     const newDeadline=[nameTask,date];
     this.deadlines=[newDeadline, ...this.deadlines];
     this.notifyObservers();
   }

  getDeadlines(){
    return this.deadlines
  }

   addObserver(callback){
   this.subscribers=this.subscribers.concat(callback);
  }
  removeObserver(obs){
  this.subscribers=this.subscribers.filter(o=>o!=obs);
 }
  notifyObservers(){
    this.subscribers.forEach(callback=> {
  try{callback()}catch(err){
        console.error("Error ", err, callback);}})
  }
}
