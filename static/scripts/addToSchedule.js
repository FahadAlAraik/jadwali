data = null
$(document).ready(function () {
    let table = $('#example').DataTable({
    
    "pageLength": 15,
    "columnDefs": [
    { "targets": "_all", "className": "text-center table-headers" }
  ],
  'ordering':false,
  "language": {
    "search": "ابحث:"
  }

});
data = table.rows().nodes().toArray()




});


function checkExists(trs,courseCode){
    trs = trs.getElementsByTagName('tr')
    for(let i =0; i<trs.length;i++){
        var tds = trs[i].querySelectorAll('td')
        if(tds[7].innerHTML == courseCode)
            return true;
    }
    return false;
  
}

function conflictFinal(courseCode,section) {
    var addTable = document.getElementById('added-courses');
    var course = document.getElementById(section)
    var courseAddedCode = course.getElementsByTagName('td')[7].innerHTML
    var trs = addTable.getElementsByTagName('tr')
    for(let i =0; i<trs.length;i++){

        if(trs[i].getAttribute('final-day') == course.getAttribute('final-day'))
            if(trs[i].getAttribute('final-date') == course.getAttribute('final-date'))
                if(trs[i].getAttribute('final-time') == course.getAttribute('final-time')){
                    window.alert(`  يوجد تعارض اختبار نهائي بين${courseCode} و ${trs[i].getElementsByTagName('td')[7].innerHTML} `)
                    return true;
                }

           

    }

    return false

}

function conflictDay(section,index){

    

    
    var course = getRelatedCourses(section,index)
    var schedule = createSchedule()

    for(let i =0; i < course.length; i++){
        courseName = course[i].getAttribute('course-name')
        courseDay = course[i].getAttribute('course-day');
        courseTime = getCourseTime(course[i]);
        var counter = 0;
        for(let j =0; j<courseDay.length;j++){

            if (courseDay[j] == ',' || courseDay[j] == ' '){
                counter ++;
                continue;
            }

            for(let day in schedule){
                if(courseDay[j] == day)
                    for(let courses in schedule[day]){
                        for(let time in schedule[day][courses]){
                            if(schedule[day][courses].includes(courseTime[counter])){
                                window.alert(`يوجد تعارض في الاوقات بين المادتين ${courseName} و ${courses}`)
                                return true;}
                        }
                    }
            }

            
        }
        
        
    }

    return false;
}

function is_numeric(str){
    return /^\d+$/.test(str);
}

function getHours(){

    let addTable = document.getElementById('added-courses');
    let trs = addTable.getElementsByTagName('tr')
    let total = 0;
    for(let i =0; i<trs.length;i++){
        let str = trs[i].getElementsByTagName('td')[3].innerHTML;
        if(is_numeric(str)){
            total += Number(str)
        }
    }

    return total
}

function addToSchedule(section,index,courseCode,courseHours){
   
    var hours = getHours()
    if(hours+Number(courseHours) >15){
        window.alert('سوف تتعدا الحد المسموح من الساعاعت')
        return
    }
    if(hours ==15){
        window.alert('الحد المسموح 15 ساعة')
        return
    }
    var addTable = document.getElementById('added-courses');
    if(checkExists(addTable,courseCode))
    {
        window.alert("من جدك؟ ماتشوفها مضافة فوق ؟")
        return
    }
    if(conflictFinal(courseCode,section)){
        return
    }

    if(conflictDay(section,index)){
        return
    }
    var sections = []
    var course = []
    for(let i =0; i < data.length;i++){
        
        var trElement = data[i];
        if(trElement.getAttribute('index') == String(index)){
            sections.push(trElement.querySelectorAll('td')[5].innerHTML)
            trElement = trElement.cloneNode(true)
            course.push(trElement)
            var counter =i+1;
            var tempTrElement = data[counter]
            if(tempTrElement==null)
            break;
            var tempTds = tempTrElement.querySelectorAll('td');
            while(tempTds[4].innerHTML != 'محاضرة'){
                if(tempTds[4].innerHTML == 'مشروع' || tempTds[4].innerHTML == 'تدريب')
                break;
                tempTrElement = tempTrElement.cloneNode(true)
                course.push(tempTrElement);
                sections.push(tempTrElement.querySelectorAll('td')[5].innerHTML)
                counter++;
                if(counter >= data.length)
                break;
                tempTrElement = data[counter]
                tempTds = tempTrElement.querySelectorAll('td');
            }
            break;
        }
    
    }
    course[0].querySelectorAll('td')[0].setAttribute("onclick",`removeSchedule(${sections})`)
    course[0].querySelectorAll('td')[0].innerHTML = "أحذف"
    for(let i =0; i < course.length; i++){
        addTable.append(course[i])
    }
}



function removeSchedule(...args){
    

    var addTable = document.getElementById('added-courses');
    var trs = addTable.getElementsByTagName('tr');
    var secetions_delete = args;
    for(let i =0; i<secetions_delete.length;i++){

        for(let j=0;j<trs.length;j++){
            if(secetions_delete[i] == trs[j].getAttribute('id')){
                addTable.removeChild(trs[j])
            }
        }


    }
    

}

function getRelatedCourses(section,index){

    var sections = []
    var course = []
    for(let i =0; i < data.length;i++){
        
        var trElement = data[i];
        if(trElement.getAttribute('index') == String(index)){
            sections.push(trElement.querySelectorAll('td')[5].innerHTML)
           
            trElement = trElement.cloneNode(true)
            course.push(trElement)
            var counter =i+1;
            var tempTrElement = data[counter]
            if(tempTrElement==null)
            break;
            var tempTds = tempTrElement.querySelectorAll('td');
            while(tempTds[4].innerHTML != 'محاضرة'){
              
                tempTrElement = tempTrElement.cloneNode(true)
          
                course.push(tempTrElement);
                sections.push(tempTrElement.querySelectorAll('td')[5].innerHTML)
                counter++;
                if(counter >= data.length)
                break;
                tempTrElement = data[counter]
                if(tempTrElement.querySelectorAll('td') == undefined)
                break;
                tempTds = tempTrElement.querySelectorAll('td');
                if(tempTds[4].innerHTML == 'مشروع')
                break;
            }
            break;
        }
    
    }
    course[0].querySelectorAll('td')[0].setAttribute("onclick",`removeSchedule(${sections})`)
    course[0].querySelectorAll('td')[0].innerHTML = "أحذف"
  
    return course;
}


function getCourseTime(course) {

    var arr = []
   
        var regex =/\d{2}:\d{2}-\d{2}:\d{2}/g
        var matches = course.getAttribute('course-time').match(regex);
        for(let j=0; j<matches.length;j++)
            arr.push(matches[j])
       
        
  

    return arr

}



function createSchedule(){
    

    var addTable = document.getElementById('added-courses');
    trs = addTable.getElementsByTagName('tr');
    var schedule = initDays()
    for(let i =0; i < trs.length; i++){
        courseDay = trs[i].getAttribute('course-day')
        courseName = trs[i].getAttribute('course-name')
        courseTime = getCourseTime(trs[i]);
        var counter = 0;
        for(let j=0; j<courseDay.length; j++){

            switch(courseDay[j]){
                case "1":
                    schedule["1"][courseName].push(courseTime[counter])
                    break;
                case "2":
                    schedule["2"][courseName].push(courseTime[counter])
                    break;
                case "3":
                    schedule["3"][courseName].push(courseTime[counter])
                    break;
                case "4":
                    schedule["4"][courseName].push(courseTime[counter])
                    break;
                case "5":
                    schedule["5"][courseName].push(courseTime[counter])
                    break;
                case " ":
                    break;
                default:
                    counter++;
                    break;
            }

        }


    }
    return schedule
}


function initDays(){
    
    
    var addTable = document.getElementById('added-courses');
    trs = addTable.getElementsByTagName('tr');
    var schedule = {
        "1":{},
        "2":{},
        "3":{},
        "4":{},
        "5":{}

    }
    for(let i =0; i < trs.length; i++){
        courseDay = trs[i].getAttribute('course-day')
        courseName = trs[i].getAttribute('course-name')
        
        var counter = 0;
        for(let j=0; j<courseDay.length; j++){

            switch(courseDay[j]){
                case "1":
                    schedule["1"][courseName] = []
                    break;
                case "2":
                    schedule["2"][courseName] = []
                    break;
                case "3":
                    schedule["3"][courseName] = []
                    break;
                case "4":
                    schedule["4"][courseName] = []
                    break;
                case "5":
                    schedule["5"][courseName] = []
                    break;
                case " ":
                  
                    break;
                default:
                    counter++;
                    break;
            }

        }


    }
    return schedule
}



function generateSchedule(major) {
    var schedule = createSchedule()

    $.ajax({
        type: "post",
        url: `/schedule/${major}`, // Replace with your Flask app endpoint
        data: JSON.stringify(schedule),
        contentType: "application/json; charset=utf-8",
        
        success: function(response) {
          $('body').html(response)
        },
        error: function(xhr, status, error) {
          
        }
      });
}



//'{{row.lecturer.strip('[]\'')}}', '{{row.final_exam_day}}','{{row.final_exam_time}}','{{row.final_exam_date}}', '{{row.course_hours}}', '{{row.course_time}}','{{row.course_day}}'
function openModal(...args) {

    $('#myModal').modal('show');
  }