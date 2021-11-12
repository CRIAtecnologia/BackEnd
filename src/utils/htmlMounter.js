module.exports = (name, hash) => `
    <div style="padding-bottom: 5px">
    <h2>Olá, ${name}!</h2>
    <p>Sua senha do SugarPix pode ser redefinida clicando no botão abaixo.</p>
    <p>Se você não solicitou uma nova senha, ignore este e-mail.</p>
    <a style="
    appearance: button;
    -moz-appearance: button;
    -webkit-appearance: button;
    text-decoration: none;
    margin-top: 1rem;
    outline: none;
    background-color: #32BCAD;
    color: #ECECEC;
    border: 0;
    border-radius: 0.4rem;
    padding: 0.45vw 1.5vw;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;" target="_blank" href="sugarpix.vercel.app/recover-password/${hash}">Redefinir senha</a>
</div>
`;