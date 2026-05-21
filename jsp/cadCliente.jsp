<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="cadCliente.css">
    <title>Cadastro de Clientes - Admin</title>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo-section">
                <h1>Cadastro de Clientes</h1>
            </div>
            <a href="http://localhost/dashboard/SkyMilles/adm.jsp">
                <img class="logo-img" src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="SkyMilles">
            </a>
        </div>

        <form id="clienteForm">
            <div class="form-grid">
                <!-- Dados Pessoais -->
                <div class="form-group full-width">
                    <label for="nomeCompleto">Nome Completo</label>
                    <input type="text" id="nomeCompleto" placeholder="Ex: João Silva Santos" required>
                </div>

                <div class="form-group">
                    <label for="cpf">CPF</label>
                    <input type="text" id="cpf" placeholder="000.000.000-00" maxlength="14" required>
                </div>

                <div class="form-group">
                    <label for="dataNasc">Data de Nascimento</label>
                    <input type="date" id="dataNasc" required>
                </div>

                <div class="form-group">
                    <label for="sexo">Sexo</label>
                    <select id="sexo" required>
                        <option value="">Selecione...</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                        <option value="O">Outro</option>
                        <option value="N">Não especificado</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="telefone">Telefone</label>
                    <input type="text" id="telefone" placeholder="(00) 00000-0000" maxlength="15" required>
                </div>

                <div class="form-group">
                    <label for="celular">Celular</label>
                    <input type="text" id="celular" placeholder="(00) 00000-0000" maxlength="15">
                </div>

                <!-- Endereço -->
                <div class="form-group">
                    <label for="cep">CEP</label>
                    <input type="text" id="cep" placeholder="00000-000" maxlength="9" required>
                </div>

                <div class="form-group full-width">
                    <label for="logradouro">Logradouro</label>
                    <input type="text" id="logradouro" placeholder="Rua, Avenida..." required>
                </div>

                <div class="form-group">
                    <label for="numero">Número</label>
                    <input type="text" id="numero" placeholder="Nº" required>
                </div>

                <div class="form-group">
                    <label for="complemento">Complemento</label>
                    <input type="text" id="complemento" placeholder="Apto, Bloco...">
                </div>

                <div class="form-group">
                    <label for="bairro">Bairro</label>
                    <input type="text" id="bairro" placeholder="Bairro" required>
                </div>

                <div class="form-group">
                    <label for="cidade">Cidade</label>
                    <input type="text" id="cidade" placeholder="Cidade" required>
                </div>

                <div class="form-group">
                    <label for="estado">Estado</label>
                    <select id="estado" required>
                        <option value="">Selecione...</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                </div>

                <!-- Dados de Acesso -->
                <div class="form-group full-width">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" placeholder="cliente@email.com" required>
                </div>

                <div class="form-group">
                    <label for="login">Nome de Usuário (Login)</label>
                    <input type="text" id="login" placeholder="Ex: joao.silva" required>
                </div>

                <div class="form-group">
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" placeholder="Mínimo 6 caracteres" required>
                    <div class="password-strength">
                        <div class="password-strength-bar" id="passwordStrength"></div>
                    </div>
                    <span class="password-hint">Mínimo 6 caracteres</span>
                </div>

                <div class="form-group">
                    <label for="confirmarSenha">Confirmar Senha</label>
                    <input type="password" id="confirmarSenha" placeholder="Digite a senha novamente" required>
                </div>

                <!-- Status e Configurações -->
                <div class="form-group">
                    <label for="status">Status do Cliente</label>
                    <select id="status" required>
                        <option value="">Selecione...</option>
                        <option value="Ativo" selected>✅ Ativo</option>
                        <option value="Inativo">❌ Inativo</option>
                        <option value="Bloqueado">🔒 Bloqueado</option>
                        <option value="Pendente">⏳ Pendente</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="tipoUsuario">Tipo de Usuário</label>
                    <select id="tipoUsuario" required>
                        <option value="">Selecione...</option>
                        <option value="cliente" selected>👤 Cliente</option>
                        <option value="vip">⭐ Cliente VIP</option>
                        <option value="corporativo">🏢 Corporativo</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="milhasIniciais">Milhas Iniciais</label>
                    <input type="number" id="milhasIniciais" placeholder="0" min="0" value="0">
                </div>

                <!-- Preferências -->
                <div class="form-group span-3">
                    <label>Preferências de Comunicação</label>
                    <div class="checkbox-group">
                        <input type="checkbox" id="receberPromocoes" name="preferencias">
                        <label for="receberPromocoes">Receber promoções por e-mail</label>
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" id="aceitarTermos" name="preferencias" required>
                        <label for="aceitarTermos">Aceito os <a href="termos.jsp" target="_blank">termos de serviço</a> e <a href="./privacidade.jsp" target="_blank">política de privacidade</a></label>
                    </div>
                </div>

                <!-- Observações -->
                <div class="form-group span-3">
                    <label for="observacoes">Observações</label>
                    <textarea id="observacoes" placeholder="Informações adicionais sobre o cliente..."></textarea>
                </div>
            </div>

            <div class="button-group">
                <button type="button" class="btn-cancelar" onclick="cancelar()">Cancelar</button>
                <button type="submit" class="btn-salvar" id="btnCadastrar">Salvar Cliente</button>
                <button type="button" class="btn-visualizar" onclick="location.href='./visuCliente.jsp'">Visualizar Clientes</button>
            </div>
        </form>

    </div>

    <script src="../js/cadCliente.js"></script>
</body>
</html>