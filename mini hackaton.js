import {
  signInFirebase,
  uploadImage,
  postClassDetailsToDB,
  postStudentDetailsToDB,
  options,
  getRealtimeCard
} from "./mini hackaton firebase.js";

// async function course(){
//     const course = await options()
//     const selectElement = document.getElementById("select_course");
//     for (let item of course) {
//         selectElement.innerHTML+=`<option selected value="Course ${item.course_name} / Time ${item.c_time} / Schedule${item.c_schedule} / Batch: ${item.b_number}"> Course: ${item.course_name} / Time: ${item.c_time} / Schedule: ${item.c_schedule} / Batch: ${item.b_number} </option>`
//     }
// }
// course();

window.signIn = async function () {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let class_form = document.getElementById("class_form");
  let student_form = document.getElementById('student_form');
  let admin_div = document.getElementById("admin_login_container");
  try {
    let userCredential = await signInFirebase(email.value, password.value);

    {
      alert(
        "Successfully signed in with the Id --> " + userCredential.user.uid
      );
    }
    class_form.style.display = "block";
    // student_form.style.display = "block";
    admin_div.style.display = "none";
  } catch (e) {
    alert("An error occurred --> \n " + e.message);
  }
};

window.hide = function () {
  let class_form = document.getElementById("class_form");
  class_form.style.display = "none";
};

window.hide_2 = function()
{
  let student_form = document.getElementById("student_form");
  student_form.style.display = "none";
}

window.studentData = async function () {
  let s_name = document.getElementById("student_name").value;
  let f_name = document.getElementById("father_name").value;
  let r_num = document.getElementById("roll_number").value;
  let contact_num = document.getElementById("contact_number").value;
  let cnic_num = document.getElementById("cnic_number").value;
  let st_course_name = document.getElementById("course_name").value;
  let image = document.getElementById("picture").files[0];
  let homePage_div = document.getElementById('homePage');
  let student_form = document.getElementById("student_form");
  try {
    const imageURL = await uploadImage(image);
    let student_id = await postStudentDetailsToDB(
      s_name,
      f_name,
      r_num,
      contact_num,
      cnic_num,
      imageURL,
      st_course_name
    );
    alert("The student details has been successfully added into the database.");
    console.log("this student's auto-generated id is = " + student_id.id);

  } 
  
  catch (e) {
    alert("An error occurred --> \n " + e.message);
  }
  student_form.style.display = "none";
  homePage_div.style.display = "block";


};

window.classData = async function() {
    let class_form = document.getElementById('class_form');
    let student_form = document.getElementById('student_form');
    
  let c_time = document.getElementById("time").value;
  let c_schedule = document.getElementById("classSchedule").value;
  let t_name = document.getElementById("T_name").value;
  let s_name = document.getElementById("S_name").value;
  let course_name = document.getElementById("C_name").value;
  let b_number = document.getElementById("B_number").value;
  try {
    await postClassDetailsToDB(
      c_time,
      c_schedule,
      t_name,
      s_name,
      course_name,
      b_number,
    );
    alert("The class details has been successfully added into the database.");
  } catch (e) {
    alert("An error occurred --> \n " + e.message);
  }
  student_form.style.display = "block";
    class_form.style.display = "none";
};

window.getCard =  function()
{
  let search_id = document.getElementById('search_id').value;
      getRealtimeCard(search_id);
      console.log("matched");

    const adsElem = document.getElementById('student_info')

    adsElem.innerHTML = ''
    for (let item of student_details) {
        adsElem.innerHTML +=`
        <div onclick="goToDetail('${item.id}')" class="ads_styling">
          <label id="ads_styling_label">Image: </label> 
           <img src=${item.imageURL} width='350px' height='180px'>
           <label id="ads_styling_label">Product Title: </label> 
           <h2>${item.title} </h2>
           <label id="ads_styling_label">Product Description: </label> 
           <h2> Description: ${item.description} </h2>
           <label id="ads_styling_label">Product Price: </label> 
           <h2> Price: ${item.price} </h2>
           <label id="ads_styling_label">Product Seller Id: </label> 
           <h2> Owner Id: ${item.userId} </h2>
    </div>`
    }
    
  }
  




