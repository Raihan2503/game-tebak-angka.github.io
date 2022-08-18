/*
    Creator Raihan Alfaridzi Kustiawan
    from zero to hero :)
*/
// let's go to write code
let jawabanArr = "";
const contentGame = document.querySelector('.content-game');
const btnAnswer = document.querySelector('.btn-answer');
const dataUser = "DATA_USER";
let jawaban = "";
let scorer = 0;
let usrArr = [];
let result = false;
let checking = false;
// checkLocalStorage
const checkLocalStorage = () => {
    if (typeof (Storage) !== undefined) {
        alert("Browser sudah mendukung localStorage");
    } else {
        alert("Web browser belum support LocalStorage");
    }
}

// mengambil data dari localStorage
const getDataLocalStorage = () => {
    if (localStorage.getItem(dataUser) !== null) {
        return JSON.parse(localStorage.getItem(dataUser));
    }
    return [];
}

let namaUser;
const nameTag = document.querySelector('.name-tag');
if (localStorage.getItem(dataUser) !== null) {
    const data = getDataLocalStorage();
    namaUser = data[0].nama;
    nameTag.innerHTML = namaUser;
}

const masukanNama = () => {
    namaUser = prompt("Masukan nama anda : ", "Raihan Alfaridzi");
    if (namaUser != undefined) {
        nameTag.innerHTML = namaUser;
    } else {
        namaUser = "Score Tebak Angka";
        nameTag.innerHTML = namaUser;
    }
}

// Create object user
const makeObjectUser = (nama, answer, score, result) => {
    return {
        nama: nama,
        answer: answer,
        score: score,
        result: result
    }
}

// menyimpan data user
const saveDataLocal = () => {
    if (localStorage.getItem(dataUser) === null) {
        const objUser = makeObjectUser(namaUser, jawaban, scorer, result);
        usrArr.push(objUser);
        localStorage.setItem(dataUser, JSON.stringify(usrArr));
    } else {
        if (checking) {
            usrArr = getDataLocalStorage();
            scorer = usrArr[0].score;
            usrArr[0] = makeObjectUser(namaUser, jawaban, ++scorer, result);
            localStorage.setItem(dataUser, JSON.stringify(usrArr));
        } else {
            usrArr = getDataLocalStorage();
            scorer = usrArr[0].score;
            usrArr[0] = makeObjectUser(namaUser, jawaban, scorer, result);
            localStorage.setItem(dataUser, JSON.stringify(usrArr));
        }
    }
}

// Generate Score
const generateScore = () => {
    let generateAnswer = "";
    generateAnswer += Math.floor(Math.random() * 9 + 1);
    generateAnswer += " " + Math.floor(Math.random() * 9 + 1);
    generateAnswer += " " + Math.floor(Math.random() * 9 + 1);
    generateAnswer.toString();
    return generateAnswer;
}

// getScore
let myAnswer = generateScore();
let jawabanValidasi = myAnswer.split(" ");
const checkAnswer = () => {
    if (myAnswer === jawaban) {
        myAnswer = generateScore();
        jawabanValidasi = myAnswer.split(" ");
        ++scorer;
        jawaban = "";
        alert("Jawaban Anda Benar!");
        checking = true;
    } else {
        alert("Jawaban Anda Salah!");
        showScore();
        checking = false;
    }
}

// get Answer
let jawaban1, jawaban2, jawaban3;
const getAnswerUser = (data) => {

if(data.target.id === "jawaban1") {
    jawaban1 = data.target.value;
}  else if(data.target.id === "jawaban2") {
    jawaban2 = data.target.value;
}  else if(data.target.id === "jawaban3") {
    jawaban3 = data.target.value;
}

if(jawaban1 != false && jawaban2 != false && jawaban3 != false) {
    jawaban = jawaban1;
    jawaban += " " + jawaban2;
    jawaban += " " + jawaban3;
}

if (jawaban1 > 9 || jawaban2 > 9 || jawaban3 > 9) {
    alert("Angka yang kamu masukan terlalu besar!");
    return false;
} else if(jawaban1.trim() > 0 || jawaban2.trim() > 0 || jawaban3.trim() > 0) {
    if(jawaban1 !== jawabanValidasi[0] && data.target.value != " " && jawaban1 != undefined 
        && data.keyCode !== 8 && data.keyCode !== 9) {
        alert("Kotak pertama salah!"); 
        return false;
    } else if(jawaban2 !== jawabanValidasi[1] && data.target.value != " " && jawaban2 != undefined 
        && data.keyCode !== 8 && data.keyCode !== 9) {
        alert("Kotak kedua salah!");
        return false;
    } else if(jawaban3 !== jawabanValidasi[2] && data.target.value != " " && jawaban3 != undefined && 
        data.keyCode !== 8 && data.keyCode !== 9) {
        alert("Kotak ketiga salah!");
        return false;
    }
}
   return jawaban;
}

const scorePlayer = document.querySelector('.score-amount');
const scoreAmount = () => {
    const dataPlayer = getDataLocalStorage();
    if (localStorage.getItem(dataUser) !== null) {
        for (const player of dataPlayer) {
            scorer = player.score;
            if (checking) {
                return scorer;
            } else {
                player.score = scorer;
                return player.score;
            }
        }
    } else {
        return 0;
    }
}

const resultPlayer = () => {
    const dataPlayer = getDataLocalStorage();
    if (localStorage.getItem(dataUser) !== null) {
        for (const player of dataPlayer) {
            if (player.score === 3) {
                alert("Kamu Menang!");
                player.result = true;
                result = player.result;
                scorer = player.scorer = 0;
                localStorage.clear();
                showScore();
            }
        }
    }
}

const showScore = () => {
    const dataPlayer = getDataLocalStorage();
    if (checking) {
        if (localStorage.getItem(dataUser) === null) {
            scorePlayer.firstElementChild.innerHTML = scorer;
        } else {
            scorePlayer.firstElementChild.innerHTML = dataPlayer[0].score;
        }
    } else {
        if (localStorage.getItem(dataUser) !== null) {
            scorePlayer.firstElementChild.innerHTML = dataPlayer[0].score;
        } else {
            scorePlayer.firstElementChild.innerHTML = scorer;
        }
    }
}
    
window.document.addEventListener('DOMContentLoaded', () => {
    showScore()
    if (localStorage.getItem(dataUser) === null) {
        showScore()
        masukanNama();
    }
})
    
btnAnswer.addEventListener('click', (e) => {
        checkAnswer();
        scoreAmount();
        saveDataLocal();
        showScore();
        resultPlayer();

    if (localStorage.getItem(dataUser) === null) {
        showScore();
        masukanNama();
        const objUser = makeObjectUser(namaUser, jawaban, 0, false);
        usrArr[0] = objUser;
        localStorage.setItem(dataUser, JSON.stringify(usrArr));
    }
    e.preventDefault();
    e.stopPropagation();
    window.location.reload();
});

let widthScreen;
widthScreen = document.body.clientWidth;
console.log(widthScreen);
if(widthScreen < 900) {
    contentGame.addEventListener('keyup', (e) => {
            getAnswerUser(e);
    });
} else {
    contentGame.addEventListener('click', (e) => {
        getAnswerUser(e)
    });
}
