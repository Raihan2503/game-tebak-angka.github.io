/*
    Creator Raihan Alfaridzi Kustiawan
    from zero to hero :)
*/
// let's go to write code
const contentGame = document.querySelector('.content-game');
const answerUser = document.querySelector('#answerUser');
const dataUser = "DATA_USER";
let jawaban;
let scorer = 0;
let usrArr = [];
let result = false;
let checking = false;
    // checkLocalStorage
    const checkLocalStorage = () => {
        if(typeof(Storage) !== undefined) {
            alert("Browser sudah mendukung localStorage");
        } else {
            alert("Web browser belum support LocalStorage");
        }
    }

    // mengambil data dari localStorage
    const getDataLocalStorage = () => {
        if(localStorage.getItem(dataUser) !== null) {
            return JSON.parse(localStorage.getItem(dataUser));
        }
        return [];
    }

let namaUser;
const nameTag = document.querySelector('.name-tag');
if(localStorage.getItem(dataUser) !== null) { 
    const data = getDataLocalStorage();
    namaUser = data[0].nama;
    nameTag.innerHTML = namaUser;
}

const masukanNama = () => {
    namaUser = prompt("Masukan nama anda : ", "Raihan Alfaridzi");
    if(namaUser != undefined) {
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
        if(localStorage.getItem(dataUser) === null) {
            const objUser = makeObjectUser(namaUser, jawaban, scorer, result);
            usrArr.push(objUser);
            localStorage.setItem(dataUser, JSON.stringify(usrArr));
        } else {
            if(checking) {
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
    const generatScore = () => {
        let generateAnswer = "";
        generateAnswer += Math.floor(Math.random() * 10 + 1);
        generateAnswer += Math.floor(Math.random() * 10 + 1);
        generateAnswer += Math.floor(Math.random() * 10 + 1);
        return generateAnswer;
    }

    // getScore
    let myAnswer = generatScore();
    const checkAnswer = () => {
        if(myAnswer == jawaban) {
            myAnswer = generatScore();
            ++scorer;
            alert("Jawaban Anda Benar!");
            checking = true;
        } else {
            alert("Jawaban Anda Salah!");
            showScore();
             checking = false;
        }
    }

    // get Answer
    const getAnswerUser = (jawaban1, jawaban2, jawaban3) => {
        return jawaban = jawaban1 + jawaban2 + jawaban3;
    }

    const scorePlayer = document.querySelector('.score-amount');
    const scoreAmount = () => {
        const dataPlayer = getDataLocalStorage();
        if(localStorage.getItem(dataUser)  !== null) {
            for(const player of dataPlayer) {
                scorer = player.score;
                if(checking) {
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
        if(localStorage.getItem(dataUser) !== null) {
            for(const player of dataPlayer) {
                if(player.score === 3) {
                    alert("Kamu Menang!");
                    player.result = true;
                    result = player.result;
                    scorer = player.scorer = 0;
                    // localStorage.setItem(dataUser, JSON.stringify(usrArr));
                    localStorage.clear();
                    showScore();
                } 
            }
        }
    }

    const showScore = () => {
        const dataPlayer = getDataLocalStorage();
        if(checking) {
            if(localStorage.getItem(dataUser) === null) {
                scorePlayer.firstElementChild.innerHTML = scorer;
            } else {
                scorePlayer.firstElementChild.innerHTML = dataPlayer[0].score;
            }
        } else {
            if(localStorage.getItem(dataUser) !== null) {
                scorePlayer.firstElementChild.innerHTML = dataPlayer[0].score;
            } else {
                scorePlayer.firstElementChild.innerHTML = scorer;
            }
        }
    }

contentGame.addEventListener('keyup', () => {
    const jawaban1 = document.getElementById('jawaban1').value;
    const jawaban2 = document.getElementById('jawaban2').value;
    const jawaban3 = document.getElementById('jawaban3').value;
    if(jawaban1 > 10 || jawaban2 > 10 || jawaban3 > 10) {
        alert("Angka yang kamu masukan terlalu besar!");
        return false;
    }
    getAnswerUser(jawaban1, jawaban2, jawaban3);
});

window.document.addEventListener('DOMContentLoaded', () => {
    showScore()
    if(localStorage.getItem(dataUser) === null) {
        showScore()
        masukanNama();
    }
})

answerUser.addEventListener('submit', e => {
    checkAnswer();
    scoreAmount();
    saveDataLocal();
    showScore();
    resultPlayer();

    if(localStorage.getItem(dataUser) === null) {
        showScore();
        masukanNama();
        const objUser = makeObjectUser(namaUser, jawaban , 0, false);
        usrArr[0] = objUser;
        localStorage.setItem(dataUser, JSON.stringify(usrArr));
    }
    e.preventDefault();
    e.stopPropagation();
});
