const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, });
    const page = await browser.newPage();
    await page.goto('https://sgpru.sistemas.ufsc.br/agendamento/home.xhtml');
    await page.type('[name = "username"]', ' DIGITE O USUÁRIO AQUI ');
    await page.type('[name = "password"]', ' DIGITE A SENHA AQUI ');
    await page.click('[type = "submit"]');
    await page.waitForTimeout(1000);
    await page.goto('https://sgpru.sistemas.ufsc.br/agendamento/restrito/agendar.xhtml');
    await page.waitForTimeout(1000);

    // Seleciona data de amanhã
    const data = new Date();
    const dataAmanha = formataData(data);
    const dataAmanhaFile = formataDataFile(data);

    // Agenda almoço:
    agendaAlmoco();
    await page.waitForTimeout(1000);

    // Agenda janta:
    agendaJanta();
    await page.waitForTimeout(1000);

    await page.goto('https://sgpru.sistemas.ufsc.br/agendamento/restrito/reservas.xhtml');
    
    await page.screenshot({ path: `${dataAmanhaFile}.png` });
    await page.waitForTimeout(1000);
    await browser.close();

async function agendaAlmoco(){
        // Seleciona Almoço
        await page.click('[name = "agendamentoForm:refeicao"]');
        await page.select('select[name="agendamentoForm:refeicao"]', '-9999997');
        await page.click('[name = "agendamentoForm:refeicao"]');
    
        // Seleciona Data
        await page.click('[name = "agendamentoForm:dtRefeicao"]');
        await page.select('select[name="agendamentoForm:dtRefeicao"]', dataAmanha);
        await page.click('[name = "agendamentoForm:dtRefeicao"]');
    
        // Seleciona Hora
        await page.click('[name = "agendamentoForm:hrRefeicao"]');
        await page.select('select[name="agendamentoForm:hrRefeicao"]', '10:30');
        await page.click('[name = "agendamentoForm:hrRefeicao"]');
    
        // Agenda Almoço
        //await page.click('[name = "agendamentoForm:j_idt93"]');
    }

    async function agendaJanta(){
        // Seleciona Janta
        await page.click('[name = "agendamentoForm:refeicao"]');
        await page.select('select[name="agendamentoForm:refeicao"]', '-9999996');
        await page.click('[name = "agendamentoForm:refeicao"]');
    
        // Seleciona Data
        await page.click('[name = "agendamentoForm:dtRefeicao"]');
        await page.select('select[name="agendamentoForm:dtRefeicao"]', dataAmanha);
        await page.click('[name = "agendamentoForm:dtRefeicao"]');
    
        // Seleciona Hora
        await page.click('[name = "agendamentoForm:hrRefeicao"]');
        await page.select('select[name="agendamentoForm:hrRefeicao"]', '17:00');
        await page.click('[name = "agendamentoForm:hrRefeicao"]');
    
        // Agenda Almoço
        //await page.click('[name = "agendamentoForm:j_idt93"]');
    }

    function zeroAEsquerda(num){
        return num >= 10 ? num : `0${num}`;
    }

    function formataData(data) {
        const dia = zeroAEsquerda(data.getDate() + 1);
        const mes = zeroAEsquerda(data.getMonth() + 1);
        const ano = zeroAEsquerda(data.getFullYear());
    
        return `${dia}/${mes}/${ano}`;
    }

    function formataDataFile(data) {
        const dia = zeroAEsquerda(data.getDate() + 1);
        const mes = zeroAEsquerda(data.getMonth() + 1);
        const ano = zeroAEsquerda(data.getFullYear());
    
        return `${dia}_${mes}_${ano}`;
    }

})();