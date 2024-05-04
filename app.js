document.getElementById('dropdownBtn').addEventListener('click', function() {
    var dropdownContent = document.getElementById('dropdownContent');
    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'block';
    }
});

var selectedOption = document.querySelector('.dropdown-content a.selected');

document.querySelectorAll('.dropdown-content a').forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        selectedOption.classList.remove('selected');
        selectedOption = this;
        selectedOption.classList.add('selected');
        document.getElementById('dropdownBtn').innerText = this.innerText;
        document.getElementById('dropdownContent').style.display = 'none';
    });
});

document.getElementById('generateBtn').addEventListener('click', function() {
    var type = selectedOption.getAttribute('data-value');
    var length = document.getElementById('passwordLength').value;
    var password = generatePassword(type, length);
    document.getElementById('passwordOutput').value = password;
});

document.getElementById('passwordLength').addEventListener('input', function() {
    document.getElementById('rangeValue').innerText = this.value;
});

document.getElementById('checkBtn').addEventListener('click', function() {
    var password = document.getElementById('passwordInput').value;
    var result = document.getElementById('result');

    if (password.length === 0){
        result.style.display = 'block';
        result.innerHTML = '<p class="result-text">At least one character is required.</p>';
    } else if (password.length < 8) {
        result.style.display = 'block';
        result.innerHTML = '<p class="result-text">Must be at least 8 characters.</p>';
    } else {
        result.style.display = 'block';
        result.innerHTML = checkPasswordStrength(password);
    }
});

function generatePassword(type, length) {
    var chars = '';
    if (type === 'mixed') {
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[]\;,./';
    } 
    else if (type === 'letters') {
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    } else if (type === 'numbers') {
        chars = '0123456789';
    }

    var password = '';
    for (var i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function checkPasswordStrength(password) {
    var score = 0;
    var complexity = '';

    if (/[a-z]/.test(password)) {
        score += 20;
    }

    if (/[A-Z]/.test(password)) {
        score += 20;
    }

    if (/[0-9]/.test(password)) {
        score += 20;
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
        score += 20;
    }

    if (password.length >= 8 && password.length <= 12) {
        complexity = 'Low';
    } else if (password.length > 12 && password.length <= 16) {
        complexity = 'Medium';
    } else if (password.length > 16) {
        complexity = 'High';
    }

    if (score < 30) {
        return `<p class="result-text">Complexity: Too Weak</p>`;
    } else if (score >= 30 && score < 50) {
        return `<p class="result-text">Complexity: Weak</p>`;
    } else if (score >= 50 && score < 70) {
        return `<p class="result-text">Complexity: Medium</p>`;
    } else if (score >= 70 && score < 90) {
        return `<p class="result-text">Complexity: Strong</p>`;
    } else {
        return `<p class="result-text">Complexity: Very Strong</p>`;
    }
}

document.getElementById("copyBtn").addEventListener("click", function() {
    var passwordOutput = document.getElementById("passwordOutput");
    if (passwordOutput.value.trim() === '') {
        var message = document.createElement("div");
        message.id = "copyMessage";
        message.innerText = "Nothing to copy!";
        document.body.appendChild(message);

        setTimeout(function() {
            message.remove();
        }, 3000);
    } else {
        passwordOutput.select();
        document.execCommand("copy");

        var message = document.createElement("div");
        message.id = "copyMessage";
        message.innerText = "Password copied to clipboard!";
        document.body.appendChild(message);

        setTimeout(function() {
            message.remove();
        }, 3000);
    }
});


document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
