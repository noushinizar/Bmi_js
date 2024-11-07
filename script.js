function calculateBMI() {
    // Get input values
    let age = parseInt(document.getElementById('age').value);
    let gender = document.getElementById('gender').value;
    let height = parseInt(document.getElementById('height').value);
    let weight = parseFloat(document.getElementById('weight').value);

    // Validate inputs
    if (!age || !height || !weight || age < 0 || height < 0 || weight < 0) {
        alert('Please enter valid values for all fields');
        return;
    }

    // Convert height from cm to meters
    height = height / 100;

    // Calculate BMI
    let bmi = weight / (height * height);

    // Categorize based on age and gender
    let bmiCategory = getBMICategory(bmi, age, gender);
    
    // Get health advice message
    let healthAdvice = getHealthAdvice(bmiCategory);

    // Store the result in localStorage to pass to the new page
    localStorage.setItem('bmi', bmi.toFixed(2));
    localStorage.setItem('category', bmiCategory);
    localStorage.setItem('advice', healthAdvice);
    localStorage.setItem('age', age);
    localStorage.setItem('gender', gender);

    // Redirect to result page
    window.location.href = 'result.html';
}

function getBMICategory(bmi, age, gender) {
    let normalBMI;

    if (gender === 'male') {
        if (age >= 18 && age <= 24) normalBMI = [19, 24];
        else if (age >= 25 && age <= 34) normalBMI = [20, 25];
        else if (age >= 35 && age <= 44) normalBMI = [21, 26];
        else if (age >= 45 && age <= 54) normalBMI = [22, 27];
        else if (age >= 55 && age <= 64) normalBMI = [23, 28];
        else normalBMI = [24, 29];
    } else if (gender === 'female') {
        if (age >= 18 && age <= 24) normalBMI = [18, 23];
        else if (age >= 25 && age <= 34) normalBMI = [19, 24];
        else if (age >= 35 && age <= 44) normalBMI = [20, 25];
        else if (age >= 45 && age <= 54) normalBMI = [21, 26];
        else if (age >= 55 && age <= 64) normalBMI = [22, 27];
        else normalBMI = [23, 28];
    } else {
        normalBMI = [19, 25];
    }

    if (bmi < normalBMI[0]) return "You are underweight.";
    else if (bmi >= normalBMI[0] && bmi <= normalBMI[1]) return "You have a normal weight.";
    else if (bmi > normalBMI[1] && bmi <= normalBMI[1] + 4) return "You are overweight.";
    else return "You are obese.";
}

function getHealthAdvice(category) {
    let advice;

    if (category.includes("underweight")) {
        advice = "You are underweight. Consider increasing your calorie intake and focusing on a balanced diet.";
    } else if (category.includes("normal")) {
        advice = "Great! You have a normal weight. Keep up with your current routine and stay active.";
    } else if (category.includes("overweight")) {
        advice = "You are overweight. Try incorporating regular physical activity and focus on a balanced diet.";
    } else if (category.includes("obese")) {
        advice = "You are obese. It is important to consult a healthcare provider for personalized advice.";
    }

    return advice;
}
