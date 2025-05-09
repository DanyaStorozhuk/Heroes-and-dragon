
    document.getElementById("character").addEventListener("mouseover", function() {
        this.src = "geroj-blue-font.png"; // При наведенні змінюємо картинку
    });
    document.getElementById("character2").addEventListener("mouseover", function() {
        this.src = "geroj-red-font.png"; // При наведенні змінюємо картинку
    });
    document.getElementById("character3").addEventListener("mouseover", function() {
        this.src = "geroj-fiolet-font.png"; // При наведенні змінюємо картинку
    });
    document.getElementById("character").addEventListener("mouseout", function() {
        this.src = "geroj-blue.png"; // Повертаємо назад при виході миші
    });
    document.getElementById("character2").addEventListener("mouseout", function() {
        this.src = "geroj-red.png"; // Повертаємо назад при виході миші
    });
    document.getElementById("character3").addEventListener("mouseout", function() {
        this.src = "geroj-fiolet.png"; // Повертаємо назад при виході миші
    });

    function changeBackground(selectedHero) {
        console.log("Обраний герой:", selectedHero); // Перевіряємо переданий шлях до героя
        document.body.style.backgroundImage = "url('fon-zamok-2.png')";
        // Створюємо драконів
        const dragon = document.createElement("img");
        dragon.src = "dragon-blue.png"; 
        dragon.id = "dragon-blue-id"
        dragon.alt = "Синій дракон";
        dragon.className = "image dragon-blue";


        const dragon2 = document.createElement("img");
        dragon2.src = "dragon-red.png"; 
        dragon2.id = "dragon-red-id"
        dragon2.alt = "Червоний дракон";
        dragon2.className = "image dragon-red";

        // Створюємо героя, обраного користувачем (один раз)
        const hero = document.createElement("img");
        hero.src = selectedHero;
        hero.id = "hero-id"
        hero.alt = "Герой";
        hero.className = "image hero";

        
        // Перевірка, чи завантажився герой
        hero.addEventListener("load", () => {
            console.log("Герой успішно завантажений!");
            document.body.appendChild(hero);
        setTimeout(() => {
            hero.classList.add("show-hero");
            console.log("Анімація героя запущена");
        }, 1000);
        });
    
        hero.onerror = () => {
            console.error("Помилка завантаження героя!");
        };
        // Додаємо драконів
        document.body.appendChild(dragon);
        document.body.appendChild(dragon2);
        // Запускаємо анімацію для драконів
        setTimeout(() => { dragon.classList.add("show-blue"); }, 500);
        setTimeout(() => { dragon2.classList.add("show-red"); }, 500);
    
        // Ховаємо інші персонажі (але **не обраного** героя)
        ['character', 'character2', 'character3', 'text', '1', '2', '3'].forEach(id => {
            const element = document.getElementById(id);
            if (element && element.src !== selectedHero) {
                element.style.display = 'none'; 
            }
        });
        setTimeout(() => { 
            document.getElementById("content2").style.display = "flex";
        }, 2000);
        setTimeout(() => { 
            document.getElementById("text_fon2").style.display = "block";
        }, 1000);
        
    }
    // створюємо вже 3 екран
    let selectedDragon = ""; 
    document.getElementById("4").addEventListener("click", () => {
        selectedDragon = "dragon-red-powernytuj.png";
        goToThirdScreen();
    });
    document.getElementById("5").addEventListener("click", () => {
        selectedDragon = "dragon-blue.png";
        goToThirdScreen();
    });
    function goToThirdScreen() {
        console.log("Обрано дракона:", selectedDragon);
    
        // Змінюємо фон на третій екран
        document.body.style.backgroundImage = "url('fon-zamok-33.png')"; 
    
        ['dragon-red-id', 'dragon-blue-id', 'hero-id', "text_fon2", "content2"].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = "none"; // Приховуємо елемент
            }
        });
    
        const chosenDragon = document.createElement("img");
        chosenDragon.src = selectedDragon;
        chosenDragon.alt = "Обраний дракон";
        chosenDragon.className = "image chosen-dragon"; 
        chosenDragon.id = "chosen-dragon";
        document.body.appendChild(chosenDragon);

        const Chmapunka = document.createElement("img");
        Chmapunka.src = "Chmarynka-first.png"; 
        Chmapunka.alt = "Хмаринка";
        Chmapunka.className = "image chosen-chmarunka";
        Chmapunka.id = "chosen-chmarunka";
        document.body.appendChild(Chmapunka);

        const c3 = document.getElementById("content3");
        c3.classList.add("show");
        setTimeout(() => { 
            chosenDragon.classList.add("show-dragon"); // Додаємо анімацію
        }, 500);
        setTimeout(() => { 
            document.getElementById("content33").style.display = "flex";
        }, 1000);
        setTimeout(() => { 
        Chmapunka.classList.add("show-cloud"); // Додаємо анімацію для хмаринки
        }, 500);
        // Робимо функціонал для кнопок 
        const disabledButtons = [7, 8, 9]; // Масив кнопок, які не працюють
        let hasAnswered = false;
        // Додаємо обробники подій тільки для кнопок третього екрану
        document.querySelectorAll("button").forEach(button => {
            const buttonId = parseInt(button.id);
        
            if ([6, 7, 8, 9].includes(buttonId)) {
                button.addEventListener("click", () => {
                    if (hasAnswered) return;
                    if (buttonId === 6) { // Якщо вибрана правильна кнопка (змія)
                        hasAnswered = true; // Позначаємо, що відповідь є
                        button.disabled = true; // Блокуємо кнопку, щоб не можна було натискати
                        button.classList.add("disabled");
                        const oldCloud = document.getElementById("chosen-chmarunka");
                        if (oldCloud) {
                            oldCloud.remove();
                        } 
                        goToThirdScreen(); //
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Спробуй ще раз!"
                        });
                    }
                });
                    
            }
        });
        document.getElementById("6").addEventListener("click", () => {
            Swal.fire({
                title: "Вітаю!",
                text: "Правильна відповідь",
                icon: "success",
                confirmButtonText: "Чудово!"
            }).then(() => { 
                // Створюємо нову кнопку
                const nextButton = document.createElement("button");
                nextButton.id = "nextQuestion";
                nextButton.textContent = "Наступне питання";
                nextButton.style.marginTop = "10px";
                // Додаємо кнопку на сторінку
                document.body.appendChild(nextButton);
                // Додаємо обробник події ПІСЛЯ додавання кнопки
                nextButton.addEventListener("click", function() {
                    document.body.style.backgroundImage = "url('fon-zamok-3.png')";
                
                    // Приховуємо попередні елементи
                    ["6", "7", "8", "9", "chosen-dragon", "nextQuestion", "chosen-chmarunka"].forEach(id => {
                        const element = document.getElementById(id);
                        if (element) {
                            element.style.display = "none"; // Правильне приховування
                        }
                    });
                
                    // Створюємо та додаємо нові елементи після кліку
                    let dragonElement = document.getElementById("chosen-dragon");
                    if (dragonElement) {
                        dragonElement.src = selectedDragon;
                        dragonElement.style.display = "block";
                    } else {
                        dragonElement = document.createElement("img");
                        dragonElement.src = selectedDragon;
                        dragonElement.alt = "Обраний дракон";
                        dragonElement.className = "image chosen-dragon";
                        dragonElement.id = "chosen-dragon";
                        document.body.appendChild(dragonElement);
                    }
                    setTimeout(() => { 
                        dragonElement.classList.add("show-dragon"); 
                    }, 100);
                    const oldCloud = document.getElementById("chosen-chmarunka");
                    if (oldCloud) {
                        oldCloud.remove();
                    }
                    const Chmapunka2 = document.createElement("img");
                    Chmapunka2.src = "Chmarynka-sekong.png"; 
                    Chmapunka2.alt = "Хмаринка2";
                    Chmapunka2.className = "image chosen-chmarunka";
                    Chmapunka2.id = "chosen-chmarunka2";
                    document.body.appendChild(Chmapunka2);
                
                    setTimeout(() => { 
                        document.getElementById("content4").style.display = "flex"; 
                    }, 100);
                
                    setTimeout(() => { 
                        Chmapunka2.classList.add("show-cloud"); 
                    }, 1000);
                    // Робимо функціонал для кнопок 
                    const disabledButtons = [20, 21, 22]; // Не робочі кнопки 
                    let hasAnswered2 = false;
                    

                    document.querySelectorAll("button").forEach(button => {
                        const buttonId = parseInt(button.id);
                    
                        if ([20,21,22,23].includes(buttonId)) {
                            button.addEventListener("click", () => {
                                if(hasAnswered2) return;
                                if(buttonId === 23) {
                                    hasAnswered2 = true;
                                    button.disabled = true;
                                    button.classList.add("disabled");
                                    goToNextQuestion(); 
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Спробуй ще раз!"
                                    });
                                }
                            });
                        }
                    });
                 
                    document.getElementById("23").addEventListener("click", () => {
                        Swal.fire({
                            title: "Вітаю!",
                            text: "Правильна відповідь",
                            icon: "success",
                            confirmButtonText: "Чудово!"
                        }).then(() => { 
                            // Створюємо нову кнопку
                            const nextButton2 = document.createElement("button");
                            nextButton2.id = "nextQuestion2";
                            nextButton2.textContent = "Наступне питання";
                            nextButton2.style.marginTop = "10px";
                        
                            // Додаємо кнопку на сторінку
                            document.body.appendChild(nextButton2);
                        
                            // Додаємо обробник події ПІСЛЯ додавання кнопки
                            nextButton2.addEventListener("click", function() {
                                document.body.style.backgroundImage = "url('fon-zamok-4.png')";
                            
                            // Приховуємо попередні елементи
                            ["20", "21", "22", "23", "chosen-dragon", "nextQuestion2", "chosen-chmarunka2"].forEach(id => {
                                const element = document.getElementById(id);
                                if (element) {
                                   element.style.display = "none"; // Правильне приховування
                                }
                            });
                            const chosenDragon3 = document.createElement("img");
                            chosenDragon3.src = selectedDragon;
                            chosenDragon3.alt = "Обраний дракон";
                            chosenDragon3.className = "image chosen-dragon"; 
                            chosenDragon3.id = "chosen-dragon333";
                            document.body.appendChild(chosenDragon3);
                            
                            const Chmapunka3 = document.createElement("img");
                            Chmapunka3.src = "Chmarynka-third.png"; 
                            Chmapunka3.alt = "Хмаринка";
                            Chmapunka3.className = "image chosen-chmarunka";
                            Chmapunka3.id = "chosen-chmarunka3";
                            
                            const c3 = document.getElementById("content5");
                            c3.classList.add("show");
                            const container = document.getElementById("content5");
                            container.appendChild(Chmapunka3);
                            setTimeout(() => { 
                                chosenDragon3.classList.add("show-dragon"); // Додаємо анімацію
                            }, 500);
                            setTimeout(() => { 
                                document.getElementById("content33").style.display = "flex";
                            }, 1000);
                            setTimeout(() => { 
                            Chmapunka3.classList.add("show-cloud"); // Додаємо анімацію для хмаринки
                            }, 500);
                            const disabledButtons = [31, 30, 33];
                            let hasAnswered3 = false;
                            document.querySelectorAll("button").forEach(button => {
                                const buttonId = parseInt(button.id);
                                if ([30, 31, 32, 33].includes(buttonId)) {
                                    button.addEventListener("click", () => {
                                        if (hasAnswered3) return;
                                    
                                        if (buttonId === 32) { // Якщо вибрана правильна кнопка (змія)
                                            hasAnswered3 = true; // Позначаємо, що відповідь є
                                            button.disabled = true; // Блокуємо кнопку, щоб не можна було натискати
                                            button.classList.add("disabled");
                                            if (oldCloud) {
                                                oldCloud.remove();
                                            } 
                                        } else {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Oops...",
                                                text: "Спробуй ще раз!"
                                            });
                                        }
                                    });
                                
                                }
                            });
                            // Функція для переходу до наступного питання
                            function goToNextQuestion() {
                                // Приховуємо попередню хмаринку перед переходом
                                const oldCloud2 = document.getElementById("chosen-chmarunka2");
                                if (oldCloud2) {
                                    oldCloud2.remove();
                                }
                            
                                // Створюємо нову хмаринку
                                const newCloud = document.createElement("img");
                                newCloud.src = "Chmarynka-third.png"; 
                                newCloud.alt = "Нова хмаринка";
                                newCloud.className = "image chosen-chmarunka";
                                newCloud.id = "chosen-chmarunka3";
                                document.body.appendChild(newCloud);
                            
                                setTimeout(() => { 
                                    newCloud.classList.add("show-cloud"); 
                                }, 1000);
                            }
                        
                            document.getElementById("32").addEventListener("click", () => {
                                Swal.fire({
                                    title: "Вітаю!",
                                    text: "Правильна відповідь",
                                    icon: "success",
                                    confirmButtonText: "Чудово!"
                                }).then(() => { 
                                    // Створюємо нову кнопку
                                    const nextButton3 = document.createElement("button");
                                    nextButton3.id = "nextQuestion3";
                                    nextButton3.textContent = "Фінал";
                                    nextButton3.style.marginTop = "10px";
                                    container.appendChild(nextButton3);
                
                                    // Додаємо кнопку на сторінку
                                    nextButton3.addEventListener("click", () => {
                                        document.body.style.backgroundImage = "url('fon-zamok-5.png')";
                                        const elementsToHide = ["30", "31", "32", "33", "chosen-dragon333", "chosen-chmarunka3", "nextQuestion3", "content5","chosen-dragon","dragon-red-id", "dragon-blue-id", "chosen-chmarunka3", "nextQuestion3", "content5"];
                                        elementsToHide.forEach(id => {
                                            const el = document.getElementById(id);
                                            if (el) {
                                                el.remove();
                                            }
                                        });
                                        
                                        // Додатково очищаємо всі елементи з класом 'image', щоб уникнути залишкових драконів
                                        document.querySelectorAll(".image").forEach(img => {
                                            img.remove();
                                        });
                                        setTimeout(() => { 
                                            const textElement = document.getElementById("text_fon3");
                                            if (textElement) {
                                                textElement.style.display = "block";
                                            }
                                        }, 1000);
                                    });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
