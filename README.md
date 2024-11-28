<div align="center"> <img width="100%" title="Banner" src="https://github.com/user-attachments/assets/41aea496-52c3-48df-a8e5-f615417a3aec"/> </div>


<h1 align="center"> PromoDucklingBot </h1>
<p align="center">O bot do discord para verificar os jogos gratúitos do momento (steam e epicgames <strong>(por enquanto)</strong> ).</p>

### Comandos:
**/ping:** Testa a conexão do promoDucklingBot (O bot responde com "pong!" caso esteja tudo funcionando!). <br>
**/github:** Envia o link deste repositório. <br>
**/freegames:** Envia uma mensagem no chat com os jogos em promoção de 100%.

### Funcionalidades:
O promoDucklingBot é um bot projetado para alertar o seu servidor sobre os jogos em promoção de 100% (gratuitos). <br>
Para utilizá-lo, basta entrar em um canal de voz e digitar __/freegames__, além disso ele possui uma função que alerta os jogos gratuitos em um canal de texto automaticamente, toda semana (configurável).

### Sobre o promoDucklingBot:
O objetivo do promoDucklingBot é que o servidor seja alertado sobre os jogos em promoção, para que assim ninguém perca a oferta!
O promoDucklingBot utiliza o <a href="https://apidocs.cheapshark.com/"><strong>CheapShark API</strong><a> para buscar os jogos em promoção em ambas as lojas.

<h2 align="center"> Como Funciona? </h2>
<h3>Entendendo os arquivos:</h3> 
Os principais arquivos para entendimento do bot, e  configuração são os seguintes -> <br>
<br>
<a href="https://github.com/vinimagod/promoDucklingBot/blob/main/.env"><strong>.env</strong></a> é o arquivo com o Token e chaves de segurança do bot <br>
<a href="https://github.com/vinimagod/promoDucklingBot/edit/main/index.js#L36C27-L36C46"><strong>index.js:</strong></a> é o arquivo principal do bot, onde todas as configurações principais de funcionamento estão. <br>
<a href="https://github.com/vinimagod/promoDucklingBot/tree/main/commands"><strong>commands:</strong></a> é a pasta onde estão salvos todos os comandos disponíveis do bot, como o <a href="https://github.com/vinimagod/promoDucklingBot/blob/main/commands/freeGames.js"><strong>freeGames.js</strong></a> que é o comando principal do promoDucklingBot.

<h3>Configurações:</h3>
É possível realizar algumas configurações para que o promoDucklingBot funcione do seu jeitinho!
<br>
<ul>
 <li>Ajustar data/horário em que o bot soltará alertas dos jogos grátis automáticamente em um canal de texto</li>
     O promoDucklingBot utiliza o padrão do node-cron para configurar o tempo de soltar os alertas.
     Por padrão os alertas serão enviados toda Sexta às 08:00 (padrão node-crom: * 8 * * 5). Então basta configurar esse padrão conforme deseja no arquivo<a href="https://github.com/vinimagod/promoDucklingBot/edit/main/index.js#L36C27-L36C46"><strong>index.js:</strong></a>. <a href="https://blog.cubos.academy/programacao-agendamento-de-tarefas-cron-e-nodejs/">Guia do node-cron</a>. <br>
 <li>Definir o canal de texto para envio automático dos jogos grátis</li>
 No mesmo arquivo do topico anterior, no "bloco" do agendamento semanal, Informe o ID do canal em que deseja que o bot envie as mensagens.
</ul>

<h2 align="center">Features futuras</h2>
<ul>
 <li>Um site com um dashboard, para convidar o bot para os servidores e alterar as suas configurações sem ter que acessar o código diretamente</li>
 <li>Novos comandos para buscar jogos em promoções menores que 100%, sendo possível seleciona o valor desejado</li>
 <li>Manter o bot 100% do tempo ativo</li>
</ul>
