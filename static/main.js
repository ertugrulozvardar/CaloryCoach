var foods_dict = {'Apple': 58, 'Orange': 49, 'Tomato': 219, 'Onion': 38, 'Watermelon': 40, 
                  'Strawberry': 26, 'Banana': 100, 'Grape': 57, 'Potato': 100, 'Rice': 363,
                  'Chicken': 132, 'Salad': 90, 'Hamburger': 313, 'Sushi': 113, 'Pizza': 266,
                  'Broccoli': 35, 'Green Beans': 90, 'Lamb': 282, 'Lamb Liver': 232, 'Salami': 446, 
                  'Sausage':287, 'Tuna': 135, 'Salmon': 171}

var foods = []

function addFoodValue() {
    var select = document.getElementById('foods');
    var food_value = select.options[select.selectedIndex].value;
    foods.push(food_value);
    selected_food_area = document.getElementById('added-foods');
    selected_food_area.innerHTML += food_value + ",";
    return foods; 
}

function calculateTotalCalory() {
    var total_calory = 0;
    var calory_result_area = document.getElementById("total-calory");
    if(calory_result_area.innerHTML == "") {
        for (const [key, value] of Object.entries(foods_dict)) {
            for(i=0; i < foods.length; i++) {
                if(foods[i] == key) {
                    total_calory = value + total_calory;
                }
            }
        }
        calory_result_area.innerHTML += total_calory + " kcal";
        foods = [];
        total_calory = 0;
    }
    else {
        alert('Calory already calculated !')
    }
}

function calculateBmh() {
    var age =  document.getElementById("age").value;
    var height =  document.getElementById("height").value;
    var weight =  document.getElementById("weight").value;
    var result_bmh = document.getElementById("result-bmh");

    if(age != "" && age >= 15 && age <= 80) {
        if(result_bmh.innerHTML == "") {
            if($("#gender-male").prop('checked') == true) {
                var bmh_male = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                console.log(bmh_male);
                result_bmh.innerHTML += bmh_male + " calories";
            }
        
            else if($("#gender-female").prop('checked') == true) {
                var bmh_female = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                console.log(bmh_female);
                result_bmh.innerHTML += bmh_female + " calories";
            }
        }
        else {
            alert('BMR already calculated !')
        }
    }
    else {
        alert("Enter a valid age !")
    }
}


var i = 1;
var j = 1;
function createTable() {
    var total_calory_text = document.getElementById("total-calory").innerHTML;
    var meal_table = document.getElementById("meal-table");
    var row = meal_table.insertRow(j);
    var meal_cell = row.insertCell(0);
    var calory_cell = row.insertCell(1);
    meal_cell.innerHTML = "Meal " + i;
    calory_cell.innerHTML += total_calory_text;
    i = i + 1;
    j = j + 1;
};


function deleteRow() {
    var meal_table = document.getElementById("meal-table");
    meal_table.deleteRow(-1);
}

function totalCaloryTable() {
    var myTab = document.getElementById('meal-table');
        var tableData = [];
    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 1; i < myTab.rows.length; i++) {

        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = myTab.rows.item(i).cells;

        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        for (var j = 0; j < objCells.length; j++) {
            if(j % 2 == 1) {
                tableData.push(objCells.item(j).innerHTML);
            }
        }

    }
    sliced_table = [];
    tableData.forEach((item) => {
        var matches = item.match(/(\d+)/);
        sliced_table.push(matches);
      });
    var table_total_cal = 0;
    for(var i = 0, len = sliced_table.length; i < len; i++){
        table_total_cal = table_total_cal + parseInt(sliced_table[i][0]);
    }
    var meal_table = document.getElementById("meal-table");
    var row = meal_table.insertRow();
    var tot_cal_cell = row.insertCell(-1);
    tot_cal_cell.innerHTML = "Total: " + table_total_cal + " kcal";
}



function exportToCsv(){
    var meal_table = document.getElementById("meal-table");
    var table_rows =[];
 
    for(var i=0,row; row = meal_table.rows[i];i++){
        column1 = row.cells[0].innerText;
        column2 = row.cells[1].innerText;

        table_rows.push(
            [
                column1,
                column2,
            ]
        );
 
        }
        csvContent = "data:text/csv;charset=utf-8,";

        table_rows.forEach(function(rowArray){
            row = rowArray.join(", ");
            csvContent += row + "\r\n";
        });
 
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Meal-Table.csv");
        document.body.appendChild(link);
        link.click();
}




function clearAll(){
    $('#total-calory').empty();
    $('#added-foods').empty();

}

function clearAllBmh(){
    $('#age').val("");
    $('#height').val("");
    $('#weight').val("");
    $('#result-bmh').empty();
    $("#gender-male").prop('checked', false);
    $("#gender-female").prop('checked', false);
}




