var courseName = document.getElementById("name");
var coursePrice = document.getElementById("price");
var courseDescription = document.getElementById("description");
var courseCapacity = document.getElementById("capacity");
var courseCategory = document.getElementById("category");
var addBtn = document.getElementById("addBtn");
var courses;
var data = document.getElementById("data");
var deleteBtn = document.getElementById("deleteBtn");
var search = document.getElementById("search");
var currentIndex = 0;
var clearBtn = document.getElementById("clearBtn");

if (JSON.parse(localStorage.getItem('courses')) == null) {
    courses = [];
} else {
    courses = JSON.parse(localStorage.getItem('courses'));
    displayData();
}

clearBtn.onclick = function () {
    clearInputs();
}
addBtn.onclick = function (e) {
    e.preventDefault();
    if (addBtn.value == "+ Add Course") {
        addCourse();
    } else {
        updateCourse();
    }

    displayData();
    clearInputs();

    courseName.classList.remove('is-valid');
    courseCapacity.classList.remove('is-valid');
    coursePrice.classList.remove('is-valid');
    courseDescription.classList.remove('is-valid');
    courseCategory.classList.remove('is-valid');
   
}

//read
function addCourse() {
    var course = {
        courseName: courseName.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value,
        courseCategory: courseCategory.value
    };
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'Course added successfully',
        showConfirmButton: false,
        timer: 1500
    })

}

function clearInputs() {
    courseName.value = "";
    coursePrice.value = "";
    courseDescription.value = "";
    courseCapacity.value = "";
    courseCategory.value = "";
    courseName.classList.remove('is-valid');
    courseCapacity.classList.remove('is-valid');
    coursePrice.classList.remove('is-valid');
    courseDescription.classList.remove('is-valid');
    courseCategory.classList.remove('is-valid');

    courseName.classList.remove('is-invalid');
    courseCapacity.classList.remove('is-invalid');
    coursePrice.classList.remove('is-invalid');
    courseDescription.classList.remove('is-invalid');
    courseCategory.classList.remove('is-invalid');
    addBtn.disabled = "true";

}

function displayData() {
    var result = "";
    for (var i = 0; i < courses.length; i++) {
        result += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${courses[i].courseName}</td>
                <td>${courses[i].courseCategory}</td>
                <td>${courses[i].coursePrice}</td>
                <td>${courses[i].courseDescription}</td>
                <td>${courses[i].courseCapacity}</td>
                <td> 
                  <a href="#" class="btn btn-primary btn-sm" onclick="getCourse(${i})" ><i class="fa-solid fa-pen"></i></a>
                 <a href="#" class="btn btn-danger btn-sm " onclick="deleteCourse(${i})"><i class="fa-solid fa-trash"></i></a>
                </td>
            </tr>`
    }
    data.innerHTML = result;
    addBtn.disabled = true;

}



// delete
deleteBtn.onclick = function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            data.innerHTML = "";
            localStorage.setItem('courses', JSON.stringify(courses));
            Swal.fire(
                'Deleted!',
                'All Courses deleted successfully',
                'success'
            )
        }
    })
    addBtn.value = "+ Add Course";
}

function deleteCourse(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem('courses', JSON.stringify(courses));
            displayData();
            Swal.fire(
                'Deleted!',
                'Course deleted successfully',
                'success'
            )
        }
    })


}


// search
search.onkeyup = function () {
    var result = "";
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())) {
            result += `  <tr>
            <th scope="row">${i + 1}</th>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td> 
              <a href="#" class="btn btn-primary btn-sm" onclick="getCourse(${i}) "  ><i class="fa-solid fa-pen"></i></a>
             <a href="#" class="btn btn-danger btn-sm " onclick="deleteCourse(${i})"><i class="fa-solid fa-trash"></i></a>
            </td>
        </tr>`
        }
    }
    data.innerHTML = result;
}

//update
function getCourse(index) {
    var course = courses[index];
    courseName.value = course.courseName;
    courseDescription.value = course.courseDescription;
    coursePrice.value = course.coursePrice;
    courseCapacity.value = course.courseCapacity;
    courseCategory.value = course.courseCategory;
    addBtn.value = "update";
    currentIndex = index;
}

function updateCourse() {
    var course = {
        courseName: courseName.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value,
        courseCategory: courseCategory.value
    };

    courses[currentIndex].courseName = course.courseName;
    courses[currentIndex].courseCapacity = course.courseCapacity;
    courses[currentIndex].courseCategory = course.courseCategory;
    courses[currentIndex].courseDescription = course.courseDescription;
    courses[currentIndex].coursePrice = course.coursePrice;
    Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: `${courses[currentIndex].courseName} course updated successfully`,
        showConfirmButton: false,
        timer: 1500
    })

    addBtn.value = "+ Add Course";
    localStorage.setItem('courses', JSON.stringify(courses));

}
courseName.onkeyup = function () {
    var patternName = /^[A-Z][a-zA-Z]{1,15}$/
    if (patternName.test(courseName.value)) {
        if (courseName.classList.contains('is-invalid') && document.getElementById('nameAlert').classList.contains('d-block')) {
            courseName.classList.replace('is-invalid', 'is-valid');
            document.getElementById('nameAlert').classList.replace('d-block', 'd-none');
        }
        else {
            courseName.classList.add('is-valid');
        }
    } else {
        if (courseName.classList.contains('is-valid') && document.getElementById('nameAlert').classList.contains('d-none')) {
            document.getElementById('nameAlert').classList.replace('d-none', 'd-block');
            courseName.classList.replace('is-valid', 'is-invalid');
        } else {
            courseName.classList.add('is-invalid');
            document.getElementById('nameAlert').classList.replace('d-none', 'd-block');
        }
    }
    test();
}


coursePrice.onkeyup = function () {
    var patternPrice = /^[0-9]{3,4}$/
    if (patternPrice.test(coursePrice.value)) {
        if (coursePrice.classList.contains('is-invalid') && document.getElementById('priceAlert').classList.contains('d-block')) {
            coursePrice.classList.replace('is-invalid', 'is-valid');
            document.getElementById('priceAlert').classList.replace('d-block', 'd-none');

        }
        else {
            coursePrice.classList.add('is-valid');
        }

    } else {
        if (coursePrice.classList.contains('is-valid') && document.getElementById('priceAlert').classList.contains('d-none')) {
            coursePrice.classList.replace('is-valid', 'is-invalid');
            document.getElementById('priceAlert').classList.replace('d-none', 'd-block');

        } else {
            coursePrice.classList.add('is-invalid');
            document.getElementById('priceAlert').classList.replace('d-none', 'd-block');

        }
    }
    test();
}

courseDescription.onkeyup = function () {
    var patternDescription = /^[A-Z][A-Za-z0-9\s]{3,150}$/
    if (patternDescription.test(courseDescription.value)) {
        if (courseDescription.classList.contains('is-invalid') && document.getElementById('descAlert').classList.contains('d-block')) {
            courseDescription.classList.replace('is-invalid', 'is-valid');
            document.getElementById('descAlert').classList.replace('d-block', 'd-none');

        }
        else {
            courseDescription.classList.add('is-valid');
        }

    } else {
        if (courseDescription.classList.contains('is-valid') && document.getElementById('descAlert').classList.contains('d-none')) {
            courseDescription.classList.replace('is-valid', 'is-invalid');
            document.getElementById('descAlert').classList.replace('d-none', 'd-block');

        } else {
            courseDescription.classList.add('is-invalid');
            document.getElementById('descAlert').classList.replace('d-none', 'd-block');

        }
    }
    test();
}

courseCapacity.onkeyup = function () {
    var patternCapacity = /^[0-9]{2,3}$/
    if (patternCapacity.test(courseCapacity.value)) {
        if (courseCapacity.classList.contains('is-invalid') && document.getElementById('capacityAlert').classList.contains('d-block')) {
            courseCapacity.classList.replace('is-invalid', 'is-valid');
            document.getElementById('capacityAlert').classList.replace('d-block', 'd-none');

        }
        else {
            courseCapacity.classList.add('is-valid');
        }

    } else {
        if (courseCapacity.classList.contains('is-valid') && document.getElementById('capacityAlert').classList.contains('d-none')) {
            courseCapacity.classList.replace('is-valid', 'is-invalid');
            document.getElementById('capacityAlert').classList.replace('d-none', 'd-block');

        } else {
            courseCapacity.classList.add('is-invalid');
            document.getElementById('capacityAlert').classList.replace('d-none', 'd-block');

        }
    }
    test();
}

courseCategory.onchange = function () {
    if (courseCategory.value) {
        if (courseCategory.classList.contains('is-invalid') && document.getElementById('categoryAlert').classList.contains('d-block')) {
            courseCapacourseCategorycity.classList.replace('is-invalid', 'is-valid');
            document.getElementById('categoryAlert').classList.replace('d-block', 'd-none');

        }
        else {
            courseCategory.classList.add('is-valid');
        }

    } else {
        if (courseCategory.classList.contains('is-valid')) {
            courseCategory.classList.replace('is-valid', 'is-invalid');
            document.getElementById('categoryAlert').classList.replace('d-none', 'd-block');
        } else {
            courseCategory.classList.add('is-invalid');
            document.getElementById('categoryAlert').classList.replace('d-none', 'd-block');

        }
    }
    test();
}



function test() {
    if (courseCapacity.classList.contains('is-valid') && courseName.classList.contains('is-valid')
        && courseDescription.classList.contains('is-valid') && coursePrice.classList.contains('is-valid')
        && courseCategory.classList.contains('is-valid')) {
        addBtn.removeAttribute('disabled');

    } else {
        if (addBtn.value == "update") {
            if (courseCapacity.classList.contains('is-invalid') || courseName.classList.contains('is-invalid') ||
                courseDescription.classList.contains('is-invalid') || coursePrice.classList.contains('is-invalid')
                || courseCategory.classList.contains('is-invalid')) {
                addBtn.disabled = true;

            } else {
                addBtn.removeAttribute('disabled');

            }
        }
    }
}











