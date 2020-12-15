import firebase from './firebase.js'

export class StudyModel{
    constructor(courses=[],comments=[],deadlines=[[]],currentCourse=null){
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
        if(modelObject.comments!=undefined){
          this.comments = modelObject.comments;
        } else {this.comments=[];}
        this.currentCourse = modelObject.currentCourse;
        if(modelObject.deadlines!=undefined){
          this.deadlines =modelObject.deadlines;
        } else {this.deadlines=[[]];}
        if(modelObject.courses!=undefined){
          this.courses = modelObject.courses;
        } else {this.courses=[];}
      }
      //När sidan laddas finns det 4 subscribers och då laddar man om sidan
      //för att lägga in de nyinladdade kurserna som hämtats. Sedan lägger man
      //till setDB observern för att uppdatera till DB korrekt.
      if(this.subscribers.length==4){
        this.notifyObservers();
        this.addObserver(()=>this.setDB(userId));
        //this.notifyObservers();
      }
    });
    this.updateCourses();
  }
  updateCourses(){
  this.courses.forEach((item, i) => {
    var ref = firebase.database().ref('/courses/' + item);
    var dbString;
    ref.on('value', (snapshot)=>{
      dbString = snapshot.val();
      let modelComments= {};
      if(dbString!==null && dbString !== undefined){
        modelComments=JSON.parse(dbString.comments);
        this.comments[i] = modelComments;
      }
      if(i==this.courses.length-1) { this.notifyObservers();}
    });
  });
}
setDB(userId){
  let modelObject = JSON.stringify(this);
  firebase.database().ref('users/' + userId).set({
    study_model: modelObject
  });

  this.courses.forEach((item, i) => {
    var modelComment = JSON.stringify(this.comments[i]);
    firebase.database().ref('courses/' + item).set({
      comments: modelComment
    });
  });
}
  addCourse(name){
    if(!this.courses.includes(name)){
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
    this.updateCourses();
  }
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

      const index = this.getCourseIndex(courseName);
      // this.deadlines[courseIndex] ger en lista [[courseName,name,date]]
      this.deadlines[index]=[[courseName,name,date],...this.deadlines[index]];
      this.deadlines[index]=this.sortList(this.deadlines[index]);
      this.deadlines=[...this.deadlines]
      this.notifyObservers();
    }


   removeDeadline(deadline){
     const index=this.getCourseIndex(deadline[0]);
     const itemIndex = this.deadlines[index].findIndex(ele => ele==deadline);

     if (index > -1) {
       this.deadlines[index].splice(itemIndex,1);
     }
     this.deadlines=[...this.deadlines]

     this.notifyObservers();
   }

    addComment(text){
      //Currentcourse är namnet på valda kursen
      const index = this.getCourseIndex(this.currentCourse);
      this.comments[index]=[[text,false],...this.comments[index]];
      this.comments=[...this.comments]
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
       this.comments=[...this.comments]
      this.notifyObservers();
    }

   removeComment(com){
     const index=this.getCourseIndex(this.currentCourse);
     const itemIndex = this.comments[index].findIndex(ele => ele==com);

     if (index > -1) {
       this.comments[index].splice(itemIndex,1);
     }
     this.comments=[...this.comments]

     this.notifyObservers();
   }

   getCourseIndex(name){
         const course = this.courses.findIndex(ele => ele==name);
         return course
     }

   getAllDeadlines(){
     var deadlineList=[];
     // deadlines     [courseName,Name,Date]
       this.deadlines.forEach(elemen => elemen.forEach(ele=>deadlineList.push(ele)));
     if (deadlineList.length==0){
       return []
     }
     deadlineList.sort(function(a,b){
         if(a[2]<b[2])
           return -1;
         else if(a[2]>b[2])
           return 1;
       })
     return deadlineList
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

  sortList(list){
  //element[1] == [courseName,namn,date]
  const sorted=list

  return sorted;
}

  sortAllDeadlines(list){
    const sorted=list

    return sorted;
  }

}
