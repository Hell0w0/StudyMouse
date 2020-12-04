import firebase from './firebase.js'

export class StudyModel{
    constructor(courses=[],comments=[],deadlines=[],currentCourse=null){
        this.courses=courses;
        this.subscribers=[];
        this.deadlines=deadlines;
        this.comments=comments;
        this.currentCourse=currentCourse;
       }

  updateModel(userId){
    var ref = firebase.database().ref('/users/' + userId);
    var dbString;
    ref.on('value', (snapshot)=>{
      dbString = snapshot.val();
      let modelObject= {};
      if(dbString!==null && dbString !== undefined){
        modelObject=JSON.parse(dbString.study_model);
        this.comments = modelObject.comments;
        this.currentCourse = modelObject.currentCourse;
        this.deadlines =modelObject.deadlines;
        this.courses = modelObject.courses;
        this.notifyObservers();
      }
    });
  }

  addCourse(name){
     this.courses=[name, ...this.courses];
     this.deadlines=[[], ...this.deadlines];
     this.comments=[[], ...this.comments];
     //1) combine the arrays:
  var list = [];
  for (var j = 0; j < this.courses.length; j++)
      list.push({'courses': this.courses[j], 'deadlines': this.deadlines[j], 'comments': this.comments[j]});

  //2) sort:
  list.sort(function(a, b) {
      return ((a.courses < b.courses) ? -1 : ((a.courses == b.courses) ? 0 : 1));
      //Sort could be modified to, for example, sort on the age
      // if the name is the same.
  });
  //3) separate them back out:
  for (var k = 0; k < list.length; k++) {
      this.courses[k] = list[k].courses;
      this.deadlines[k] = list[k].deadlines;
      this.comments[k] = list[k].comments;

  }

     this.notifyObservers();
   }

   removeCourse(course){
     const index = this.courses.indexOf(course);
    if (index > -1) {
      this.courses.splice(index, 1);
      this.deadlines.splice(index, 1);
      this.comments.splice(index, 1);
    }
     if (course==this.currentCourse)
        this.currentCourse=null
     this.notifyObservers();

   }



    setCurrentCourse(course){
      this.currentCourse=course;
      this.notifyObservers();
    }

   addDeadline(name,date,courseName){

     const courseIndex = this.getCourseIndex(courseName);
     // this.deadlines[courseIndex] ger en lista [[courseName,name,date]]
     this.deadlines=[[courseName,name,date],...this.deadlines];
     this.deadlines=this.sortDeadline(this.deadlines)
     this.notifyObservers();
   }

   removeDeadline(deadline){
     const index=this.getCourseIndex(deadline[0]);
     if (index > -1) {
       this.deadlines.splice(index, 1);
     }
     this.notifyObservers();
   }

   addComment(text){
     //Currentcourse är namnet på valda kursen
     const index = this.getCourseIndex(this.currentCourse);
     this.comments[index]=[[text,false],...this.comments[index]];
     this.notifyObservers();
   }

   checkBox(value){
     const index=this.getCourseIndex(this.currentCourse);
     const commentIndex = this.comments[index].findIndex(ele => ele[0]==value[0]);
     if (this.comments[index][commentIndex][1]==true)
      this.comments[index][commentIndex][1]=false;
      else{
        this.comments[index][commentIndex][1]=true;

      }
     this.notifyObservers();


   }

   removeComment(com){
     const index=this.getCourseIndex(this.currentCourse);

     if (index > -1) {
       this.comments[index].splice(index, 1);
     }
     this.notifyObservers();
   }

   getCourseIndex(name){
         const course = this.courses.findIndex(ele => ele==name);
         return course
     }

   getAllDeadlines(){
     var deadlineList=[];
     // deadlines     [courseName,Name,Date]
     this.deadlines.map(elemen => elemen.forEach(ele=>deadlineList=[ele,...deadlineList]));
     if (deadlineList.length==0){
       return []
     }
     return this.sortDeadline(deadlineList)
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

  sortDeadline(list){
  //element[1] == [courseName,namn,date]
  const sorted=list
  sorted.sort(function(a,b){
      if(a<b)
        return -1;
      else if(a>b)
        return 1;
    })
  return sorted;
}
}
