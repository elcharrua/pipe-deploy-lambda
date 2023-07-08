**Variáveis**
A pipeline define várias variáveis que são usadas ao longo das etapas:

AWS_REGION: Especifica a região da AWS (por exemplo, "us-east-1").
SPR_APP_NAME: O nome do aplicativo, derivado do nome do projeto do GitLab CI/CD.
TAG_ENV_DEV: Tag para o ambiente de desenvolvimento.
TAG_ENV_QA: Tag para o ambiente de QA.
TAG_ENV_STG: Tag para o ambiente de staging.
TAG_ENV_PROD: Tag para o ambiente de produção.
**Etapas**
A pipeline consiste nas seguintes etapas:

**Build**
A etapa build é responsável por construir o aplicativo. Ela utiliza a imagem Docker harbor.rd.com.br/devops/rd-maven:3-openjdk-11 e executa as seguintes etapas:

Atualiza os repositórios de pacotes.
Atualiza os pacotes instalados.
Instala o utilitário sed.
Modifica o arquivo index.js substituindo um padrão específico de URL.
Instala o utilitário zip.
Cria um arquivo zip com o código do aplicativo, excluindo o arquivo .gitlab-ci.yml.
Faz upload do arquivo zip como artefato.
**Deploy**
A etapa deploy lida com a implantação do aplicativo no AWS Lambda. Ela utiliza a imagem Docker harbor.rd.com.br/devops/rd-dind-aws:2.2.0 e executa as seguintes etapas:

Verifica se o bucket S3 especificado por BUCKET_NAME existe. Se não existir, cria o bucket.
Copia o arquivo zip criado anteriormente ($SPR_APP_NAME.zip) para o bucket S3.
Verifica se a função Lambda já existe consultando a localização do código. Se não existir, cria uma nova função e atualiza sua configuração.
Se a função já existir, atualiza seu código e configuração.
**Event**
A etapa event configura uma regra de evento para a função Lambda e ativa os logs do CloudWatch. Ela utiliza a imagem Docker harbor.rd.com.br/devops/rd-dind-aws:2.2.0 e executa as seguintes etapas:

Cria uma regra de evento usando o AWS EventBridge com uma expressão cron e padrão de evento específicos.
Associa a função Lambda como um destino para a regra de evento.
Verifica se o acionador já existe. Se não existir, cria o acionador.
Ativa os logs do CloudWatch para a função Lambda e cria um grupo de log.
(Comentado) Executa uma consulta no CloudWatch Logs Insights para recuperar dados de log.
Observe que algumas partes do script da etapa event estão comentadas (#) e podem exigir configuração adicional ou ajustes.

As etapas da pipeline são configuradas para serem executadas apenas para o branch develop.

Sinta-se à vontade para personalizar a pipeline de acordo com seus requisitos específicos ou modificar a configuração conforme necessário.
