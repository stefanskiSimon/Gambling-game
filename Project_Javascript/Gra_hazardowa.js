const prompt = require("prompt-sync")();

const kolumny = 4;
const wiersze = 4;
const s_sumbole = 
{
    "A":4,
    "B":4,
    "C":5,
    "D":8
};

const wartosc_symboli = 
{
    A:5,
    B:3,
    C:4,
    D:3
};

const depozyt = () => 
{
    while(true)
    {
        const wartosc_depozytu = prompt("Podaj wartość depozytu: ");
        const prawdziwa_wartosc = parseFloat(wartosc_depozytu);
    
        if(isNaN(prawdziwa_wartosc) || prawdziwa_wartosc <= 0)
        {
            console.log("Nieprawidłowa wartosc, sprobuj ponownie.\n");
        }
        else
        {
            return prawdziwa_wartosc
        }
    }
};

const liczba_zakladanych_wierszy = () =>
{
    while(true)
    {
        const zakladane_wiersze = prompt("Podaj liczbe wierszy, na które stawiasz (1-4): ");
        const prawdziwe_wiersze = parseFloat(zakladane_wiersze);
    
        if(isNaN(prawdziwe_wiersze) || prawdziwe_wiersze <= 0 || prawdziwe_wiersze > 4)
        {
            console.log("Nieprawidłowa liczba wierszy, sprobuj ponownie.\n");
        }
        else
        {
            return prawdziwe_wiersze;
        }
    }
};

const stworz_zaklad = (balans_konta, liczba_wierszy) => 
{
    while(true)
    {
        const zaklad = prompt("Podaj sume zakladu: ");
        const prawdziwy_zaklad = parseFloat(zaklad);
    
        if(isNaN(prawdziwy_zaklad) || prawdziwy_zaklad <= 0 || prawdziwy_zaklad > balans_konta/liczba_wierszy)
        {
            console.log("Nieprawidłowy zaklad, sprobuj ponownie.\n");
        }
        else
        {
            return prawdziwy_zaklad;
        }
    }
};

const maszyna_losujaca = () =>
{
    const symbole = [];
    for(const [symbol, liczba] of Object.entries(s_sumbole))
    {
        for(let i = 0; i < liczba; i++)
        {
            symbole.push(symbol);
        }
    }
    

    const tablica = [];

    for(let i = 0; i< kolumny; i++)
    {
        tablica.push([]);
        const tablicasymboli = [...symbole];
        for(let j = 0; j<wiersze; j++)
        {
            const randomindex = Math.floor(Math.random() * tablicasymboli.length);
            const wybranySymbol = tablicasymboli[randomindex];
            tablica[i].push(wybranySymbol);
            tablicasymboli.splice(randomindex, 1);
        }
    }
    return tablica;
};

const transpozycja =(tablica) =>
{
    const WIERSZE = [];

    for(let i =0;i<wiersze;i++)
    {
        WIERSZE.push([]);
        for(let j = 0; j< kolumny; j++)
        {
            WIERSZE[i].push(tablica[j][i]);
        }
    }

    return WIERSZE;
}

const wyswietlwiersze = (WIERSZE) =>
{
    for(const wiersz of WIERSZE)
    {
        let string = "";
        for(const [i,symbol] of wiersz.entries())
        {
            string += symbol
            if(i != wiersz.length - 1)
            {
                string += " | "
            }
        }
        console.log(string)
    }
}

const wygrana = (WIERSZE, zaklad, zakladane_wiersze) => 
{
    let wygrane = 0;

    for(let wiersz = 0; wiersz < zakladane_wiersze; wiersz++)
    {
        const symbole = WIERSZE[wiersz];
        let jackpot = true;

        for(const symbol of symbole)
        {
            if(symbol != symbole[0])
            {
                jackpot = false;
                break;
            }
        }

        if(jackpot)
        {
            wygrane += zaklad * wartosc_symboli[symbole[0]];
        }
    }
    return wygrane;
}
const gra = () => 
{
    const tablica = maszyna_losujaca();
    //console.log(tablica);
    let balans_konta = depozyt();
    while(true)
    {
        console.log("Na twoim koncie masz: " + balans_konta + " zl")
        const zakladane_wiersze = liczba_zakladanych_wierszy();
        const zaklad = stworz_zaklad(balans_konta,zakladane_wiersze);
        balans_konta -= zaklad * zakladane_wiersze;
        const WIERSZE = transpozycja(tablica);
        //console.log(tablica);
        //console.log(WIERSZE);
        wyswietlwiersze(WIERSZE);
        const wygrane = wygrana(WIERSZE, zaklad, zakladane_wiersze);
        balans_konta += wygrane;
        console.log("Wygrales: " + wygrane.toString() + " zl");

        if (balans_konta <= 0)
        {
            console.log("Nie masz juz pieniedzy")
            break;
        }

        const zagrajPonownie = prompt("Chcesz zagrac ponownie? (t/n) ");
        if (zagrajPonownie != "t")break;
    } 
};

gra();