function findDisease() {
    try {
        const symptoms = [];
        const checkboxes = document.querySelectorAll('input[name="symptoms"]:checked');
        
        if (!checkboxes || checkboxes.length === 0) {
            alert('Please select at least one symptom');
            return;
        }
        
        checkboxes.forEach(checkbox => {
            symptoms.push(checkbox.id);
        });

        // Simple disease matching logic
        let possibleConditions = [];
        if (symptoms.includes('fever') && symptoms.includes('cough')) {
            possibleConditions.push('Common Cold or Flu');
        }
        if (symptoms.includes('headache') && symptoms.includes('fatigue')) {
            possibleConditions.push('Migraine or Stress');
        }
        if (symptoms.includes('fever') && symptoms.includes('bodyPain')) {
            possibleConditions.push('Viral Infection');
        }

        const resultDiv = document.getElementById('result');
        if (!resultDiv) {
            console.error("Result container not found");
            return;
        }
        
        resultDiv.style.display = 'block';
        
        if (possibleConditions.length > 0) {
            resultDiv.className = 'result-success';
            resultDiv.innerHTML = `<h3>Possible Conditions:</h3><p>${possibleConditions.join(', ')}</p>
                <p><small>Note: This is a basic assessment. Please consult a healthcare professional for accurate diagnosis.</small></p>`;
        } else {
            resultDiv.className = 'result-warning';
            resultDiv.innerHTML = `<p>No specific conditions matched your symptoms. Please consult a healthcare professional for proper diagnosis.</p>`;
        }
    } catch (error) {
        console.error("Error finding disease:", error);
        alert("An error occurred while processing your request. Please try again.");
    }
} 