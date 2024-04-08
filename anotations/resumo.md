# SQL

- SELECT (seleciona tabelas)
    - SELECT * FROM tabela1    (seleciona tudo da tabela1)
    - SELECT StoreKey, StoreName, StorePhone FROM DimStore  (seleciona colunas especificas q eu quero)
    - SELECT TOP(10) * FROM DimProduct   (seleciona as 10 primeiras linhas da tabela)
    - SELECT TOP(10) PERCENT * FROM DimProduct  (seleciona as 10% primeiras linhas da tabela)
    - SELECT DISTINCT Colorname FROM DimProduct   (seleciona só as linhas de valores distintos de uma coluna)
- AS (renomear colunas)
    - SELECT productname AS ‘produto’ FROM dimproduct    (altera o nome da coluna na hora de visualizar)
    
- ORDER BY (ordena de acordo com alguma coluna)
    - SELECT
    
                    * 
    
           FROM 
    
                    tabela1 
    
           ORDER BY coluna1 ASC (seleciona tudo da tabela1 e ordena em ordem crescente pela coluna1)
    
    - SELECT
    
                    * 
    
           FROM 
    
                    tabela1 
    
           ORDER BY coluna1 DESC (seleciona tudo da tabela1 e ordena em ordem decrescente pela coluna1)
    
    - SUM: esta cláusula é usada para somar os valores de uma determinada coluna em uma determinada tabela. Por exemplo:
        
        ```
          - SELECT SUM(Price) FROM DimProduct
        
        ```
        
- WHERE (seleciona as linhas que atenderem ao critério desejado)
    - WHERE (selects rows that meet the desired criteria)
        - SELECT
        
                     product
        
               FROM
        
                     dimProduct 
        
                WHERE price > 50 
        
        (selects all products from dimProduct where the price is greater than 50)
        
        - SELECT
        
                     product
        
               FROM
        
                     dimProduct 
        
                WHERE product = ‘rftgyh’ AND sla = ‘wffdesw’
        
    - WHERE IN (evita repetição de código)
        - SELECT * FROM DimProduct WHERE ColorName = ‘blue’ or ColorName = ‘red’
        
        é melhor fazer assim:
        
        - SELECT * FROM DimProduct WHERE ColorName IN (’red’, ‘blue’)
    - WHERE LIKE (procura palavra no meio da frase)
        - SELECT * FROM DimProduct WHERE ProductName LIKE ‘%MP3 Player%’
            
            (retorna qualquer linha de ProductName que tenha a frase ‘MP3 Player’ no meio dela)
            
        - SELECT * FROM DimProduct WHERE ProductName LIKE ‘MP3 Player%’
            
            (retorna qualquer linha de ProductName que tenha a frase ‘MP3 Player’ no começo dela)
            
        - SELECT * FROM DimProduct WHERE ProductName LIKE ‘%MP3 Player’
            
            (retorna qualquer linha de ProductName que tenha a frase ‘MP3 Player’ no final dela)
            
        
    - WHERE BETWEEN (entre valores)
        - SELECT * FROM DimProduct WHERE Price BETWEEN 50 AND 100
        
              (selects all products from DimProduct where the                      price is between 50 and 100)
        
    - WHERE IS NULL (nulo)
        - SELECT * FROM DimProduct WHERE Price IS NULL
        
        (selects all products from DimProduct where the price is not specified or unknown)
        
- SUM / COUNT / COUNT + DISTINCT
    
    (soma todos os valores na coluna Price da tabela DimProduct)
    
    - COUNT: esta cláusula é usada para contar o número de linhas em uma determinada tabela. Por exemplo:
        
        ```
          - SELECT COUNT(*) FROM DimProduct
        
        ```
        
    
    (conta o número total de linhas na tabela DimProduct)
    
    - COUNT + DISTINCT: esta cláusula é usada para contar o número de valores distintos em uma determinada coluna em uma determinada tabela. Por exemplo:
        
        ```
          - SELECT COUNT(DISTINCT ColorName) FROM DimProduct
        
        ```
        
    
    (conta o número de valores distintos na coluna ColorName da tabela DimProduct)
    
- MIN / MAX / AVG
    - MIN: esta cláusula é usada para encontrar o valor mínimo em uma determinada coluna em uma determinada tabela. Por exemplo:
        
        ```
          - SELECT MIN(Price) FROM DimProduct
        
        ```
        
    
    (retorna o menor valor na coluna Price da tabela DimProduct)
    
    - MAX: esta cláusula é usada para encontrar o valor máximo em uma determinada coluna em uma determinada tabela. Por exemplo:
        
        ```
          - SELECT MAX(Price) FROM DimProduct
        
        ```
        
    
    (retorna o maior valor na coluna Price da tabela DimProduct)
    
    - AVG: esta cláusula é usada para encontrar o valor médio em uma determinada coluna em uma determinada tabela. Por exemplo:
        
        ```
          - SELECT AVG(Price) FROM DimProduct
        
        ```
        
    
    (retorna o valor médio da coluna Price da tabela DimProduct)
    
- GROUP BY
    
    
    agrupa os dados de acordo com uma categoria desejada
    
    ```jsx
    SELECT
       COUNT(*) AS 'quantidade de produtos'
    FROM
       DimProduct
    ```
    
    (isso mostra a quantidade total dos produtos em geral)
    
    ```jsx
    SELECT
       BrandName AS 'nome da marca',
       COUNT(*) AS 'quantidade de produtos'
    FROM
       DimProduct
    GROUP BY BrandName
    ```
    
    (já isso, mostra a quantidade total dos produtos em separados pela marca, então a soma de todos vai ser a quantidade total em geral)
    
- GROUP BY + WHERE / GROUP BY + HAVING
    
    O WHERE é usado pra aplicar um filtro antes da operação, então isso pode alterar a contagem
    
    ```jsx
    SELECT
       BrandName AS 'nome da marca',
       COUNT(*) AS 'quantidade de produtos'
    FROM
       DimProduct
    WHERE BrandName = 'Litware'
    GROUP BY BrandName
    ```
    
    (isso vai selecionar a quantidade de produtos apenas da marcar Litware)
    
    O HAVING é usado pra aplicar um filtro após a contagem
    
    ```jsx
    SELECT
       BrandName AS 'nome da marca',
       COUNT(*) AS 'quantidade de produtos'
    FROM
       DimProduct
    GROUP BY BrandName
    HAVING COUNT(*) > 100
    ```
    
    (isso vai selecionar após a contagem de cada marca, apenas as marcas e respectivas quantidades maiores que 100)
    
- JOIN
    
    (permite interligar mais de uma tabela) 
    
    (usa ids ou chaves para achar informações de outras tabelas que detalham essas chaves) (ex: id 1 de uma pessoa e em outra tabela tem o id e o nome, número, cep etc.)
    
    (colunas em comum)
    
    - CHAVE PRIMARIA X CHAVE ESTRANGEIRA
        
        ![Captura de tela 2023-09-09 121301.png](SQL%200d024ee3cfa74466b5243e515f9b891b/Captura_de_tela_2023-09-09_121301.png)
        
    - TABELA FATO X TABELA DIMENSÃO
        
        ![Captura de Tela (171).png](SQL%200d024ee3cfa74466b5243e515f9b891b/Captura_de_Tela_(171).png)
        
    - LEFT (OUTER) JOIN
        
        ![Captura de Tela (172).png](SQL%200d024ee3cfa74466b5243e515f9b891b/Captura_de_Tela_(172).png)
        
    - RIGHT (OUTER) JOIN
        
        ![Captura de Tela (173).png](SQL%200d024ee3cfa74466b5243e515f9b891b/Captura_de_Tela_(173).png)
        
    - INNER JOIN
        
        ![Captura de Tela (174).png](SQL%200d024ee3cfa74466b5243e515f9b891b/Captura_de_Tela_(174).png)
        
        ![Captura de Tela (176).png](SQL%200d024ee3cfa74466b5243e515f9b891b/Captura_de_Tela_(176).png)
        
        ![Captura de Tela (177).png](SQL%200d024ee3cfa74466b5243e515f9b891b/Captura_de_Tela_(177).png)
        
    - EXEMPLO
        
        ```jsx
        SELECT TOP(100) * FROM DimProduct
        SELECT TOP(100) * FROM DimProductSubcategory
        ```
        
        essas duas tabelas tem chaves em comum, como pode-se observar
        
        ![Captura de tela 2023-09-09 234950.png](SQL%200d024ee3cfa74466b5243e515f9b891b/Captura_de_tela_2023-09-09_234950.png)
        
        vou selecionar as colunas que eu  quero da primeira e a correspondente ao id da segunda, deixando claro que o ProductSubcategoryKey que eu quero substituir vem do dimproduct
        
        ```jsx
        SELECT
           ProductName,
           ProductDescription,
           BrandName,
           DimProduct.ProductSubcategoryKey,
           DimProductSubcategory.ProductSubcategoryName
        FROM
           DimProduct
        LEFT JOIN DimProductSubcategory
           ON DimProduct.ProductSubcategoryKey = DimProductSubcategory.ProductSubcategoryKey
        ```
        
        ![Captura de tela 2023-09-09 235019.png](SQL%200d024ee3cfa74466b5243e515f9b891b/Captura_de_tela_2023-09-09_235019.png)
        
    
- CROSS JOIN
    
    faz um produto cartesiano em duas tabelas
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled.png)
    
- MÚLTIPLOS JOINS
    
    quando não da pra fazer a transição do join direto de uma tabela a outra, precisssando de uma intermediária
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%201.png)
    
    ![Captura de tela 2023-09-10 000152.png](SQL%200d024ee3cfa74466b5243e515f9b891b/Captura_de_tela_2023-09-10_000152.png)
    
    aq por ex no poductsubcategorykey
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%202.png)
    
- UNION e UNION ALL
    
    union é usado quando duas tabelas tem exatamente a mesma estrutura e da pra juntar elas (junta e remove duplicados)
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%203.png)
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%204.png)
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%205.png)
    
    UNION ALL  é quase a mesma coisa mas não remove duplicados
    
- GROUP BY + JOIN
    
    O JOIN vem antes do GROUP BY e não tem nenhum mistério
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%206.png)
    

variaveis

- SQL_VARIANT_PROPERTY
    
    ver qual o tipo 
    
    select SQL_VARIANT_PROPERTY(10, ‘BaseTye’)  
    
    int
    
- CAST
    
    funcao que especifica o tipo do dado
    
    int: inteiro
    
    float: decimal
    
    varchar: string/texto
    
    datetime: data e hora
    
    SELECT CAST(1.45 AS INT)
    
    força o sql a entender o 1.45 como um int
    
- FORMAT
    
    select format(valor, formato)
    
    SELECT FORMAT(1000, ‘N’)
    
    (normal) retorna 1.000
    
    SELECT FORMAT(1000, ‘G’)
    
    (generico) retorna 1000
    
    SELECT FORMAT(1234456789, ‘###-##-####’)
    
    retorna 123-45-6789
    
    SELECT FORMAT(CAST(’21/08/2021’ as DATETIME), ‘dd/MM/yyyy’)
    
    retorna 21/08/2021
    
    SELECT FORMAT(CAST(’21/08/2021’ as DATETIME), ‘dd/MMMM/yyyy’)
    
    retorna 21/agosto/2021
    
    SELECT FORMAT(CAST(’21/08/2021’ as DATETIME), ‘yyyy’)
    
    retorna 2021
    
- ROUND
    
    arredonda
    
    SELECT ROUND(13.73912, 2)
    
    retorna 13.34
    
    SELECT ROUND(13.73912, 2, 0)
    
    retorna 13.74
    
    SELECT ROUND(13.73912, 2, 1)
    
    retorna 13.73
    
- FLOOR
    
    arredonda pra baixo
    
    SELECT ROUND(13.73912)
    
    retorna 13
    
- CEILING
    
    arredonda pra cima
    
    SELECT ROUND(13.73912)
    
    retorna 14
    
- DECLARE/SET/SELECT
    
    DECLARE @var INT
    
    SET @var = 10
    
    SELECT @var 
    
    da pra fazer atribuição direta tbm
    
    DECLARE @var INT = 10
    
- PRINT
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%207.png)
    
- variáveis dentro da seleção direto a tabela
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%208.png)
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%209.png)
    
- acumular valores dentro de uma variável
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%2010.png)
    
    CHAR(10) - pula uma linha
    
- variáveis globais
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%2011.png)
    

manipulação de textos e datas

- LEN/DATALENGTH
    
    len(”abc”) retorna 3
    
    datalength(”abc”) retorna 3
    
    len(”abc  ”) retorna 3
    
    datalength(”abc  “) retorna 5
    
- CONCAT
    
    CONCAT(firstname, lastname) retorna literalmente o nome todo junto
    
    CONCAT(firstname, ‘ ‘, lastname) retorna literalmente o nome todo certo
    
- LEFT/RIGHT
    
    left extrai uma determinada qtd de caracteres de um texto, da esquerda para a direita
    
    right extrai uma determinada qtd de caracteres de um texto, da esquerda para a direita
    
    select LEFT(‘produto123’, 7)   retorna produto
    
    select RIGHT(‘produto123’, 3)   retorna 123
    
- REPLACE
    
    select replace(”O excel é o melhor”, “excel”, “sql”) 
    
           retorna “o sql é o melhor”
    
- TRANSLATE
    
    substitui cada caractere na ordem encontrada no texto
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%2012.png)
    
- STUFF
    
    substitui qualquer texto com uma quantidade de caracteres limitados, por um outro texto
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%2013.png)
    
- UPPER /  LOWER
    
    meio obvio…
    
    upper(’abc’) retorna ABC
    
- CHARINDEX
    
    SELECT CHARINDEX(’M’, ‘Raquel Moreno’)  
    
         retorna 8
    
- SUBSTRING
    
    SELECT SUBSTRING(”Raquel Moreno”, 8, 6) 
    
          retorna ‘Moreno’
    
- TRIM / LTRIM / RTRIM
    
    trim - tira espaço adicionais a esquerda e a direita do texto
    
    ltrim - tira espaço adicionais a esquerda do texto
    
    rtrim - tira espaço adicionais a direita do texto
    
- DAY / MONTH / YEAR
    
    @vardata  = ‘23/03/2021’
    
    DAY(@vardata) 
    
       retorna 23
    
    MONTH(@vardata)
    
       retorna 03
    
    YEAR(@vardata) 
    
       retorna 2021
    
- DATEFROMPARTS
    
    @vardia = 13
    
    @varmes = 2
    
    @varano = 2021
    
    select DATEFROMPARTS(@vardia, @varmes, @varano) 
    
        retorna 12/02/2021
    
- GETDATE / SYSDATETIME  / DATENAME E DEATEPART
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%2014.png)
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%2015.png)
    
- DATEADD / DATEDIFF0
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%2016.png)
    

funcoes condicionais

- CASE
    
    CASE 
    
            WHEN teste THEN ‘resultado1’
    
       ELSE ‘resultado2’
    
    END
    
- IIF
    
    IIF( condicao, secondicao, senao)
    
- ISNULL
    
    ISNULL(analisar, se for null vai trocar o atualisar)
    

sql views

- pq criar views
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%2017.png)
    
    [https://www.notion.so](https://www.notion.so)
    
- CREATE VIEW
    
    CREATE VIEW nomeview AS SELECT …
    
    colocar GO no final ou começo do comando para o sql saber onde começar/terminar
    
    views sao armazenadas na pasta exibições
    
- USE
    
    especifica em qual banco de dados o view tem q ser criado
    
    USE teste
    
- ALTER VIEW
    
    GO
    
    ALTER VIEW teste AS
    
    SELECT … 
    
    GO
    
- DROP VIEW
    
    DROP VIEW teste
    
    exclui o view teste
    

crud

- o que é
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%2018.png)
    
- CREATE DATABASE
    
    CREATE DATABASE Teste
    
- DROP DATABASE
    
    DROP DATABASE Teste
    
- CREATE TABLE
    
    USE bancodedados
    
    CREATE TABLE nome_tabela (
    
          coluna1 tipo,
    
          coluna2 tipo,
    
     coluna3 tipo
    
      )
    
- INSERT SELECT
    
    INSERT INTO  nome_tabela(coluna1, coluna2, coluna3)
    
    SELECT
    
          coluna1,
    
    coluna2,
    
    coluna3
    
    FROM outra_tabela
    
- INSERT INTO
    
    INSERT INTO  nome_tabela(coluna1, coluna2, coluna3)
    
          (conteudo1, conteudo2, conteudo3), 
    
          (conteudo1, conteudo2, conteudo3)
    
- UPDATE
    
    UPDATE nome_tabela
    
    VALUES 
    
    SET nome_produto = “sla”
    
    WHERE  id_produto = 3
    
- DELETE
    
    DELETE 
    
    FROM nome_tabela
    
    WHERE coluna1 = ‘sla’
    
    (deleta um dado)
    
- DROP TABLE
    
    DROP TABLE nome_tabela
    
- ALTER TABLE
    
    alter table nome_tabela
    
    ADD coluna4 tipo
    
    (ficam com valor NULL)
    
    ALTER TABLE nome_tabela
    
    ALTER COLUMN coluna1 tipo
    
    (muda o tipo da coluna1)
    
    ALTER TABLE nome_tabela
    
    DROP COLUMN coluna1 
    
    (apaga coluna1)
    

subqueries

- o que é
    
    ![Untitled](SQL%200d024ee3cfa74466b5243e515f9b891b/Untitled%2019.png)
    
- EX
    
    SELECT
    
          coluna1, 
    
          coluna2
    
    FROM
    
           tabela
    
    WHERE coluna1 in (SELECT …)
    
- ANY, SOME e ALL
    
    SELECT * FROM funcionarios 
    
    WHERE idade IN (21, 23, 32)
    
    =
    
    SELECT * FROM funcionarios 
    
    WHERE idade IN (SELECT idade FROM funconarios WHERE sexo = ‘M’)
    
    =
    
    SELECT * FROM funcionarios 
    
    WHERE idade = ANY  (SELECT idade FROM funconarios WHERE sexo = ‘M’)
    
    (vantagem: permite operadores, maior menor etc.)
    
    equivalente ao in, seleciona linha q tem valor igual a valor1 ou valor2 ou valoe3…
    
    ---
    
    SOME e ANY sao equivalentes
    
    se usar o ALL, 
    
    ele seleciona linha q tem valor maior a valor1 e valor2 e valoe3…
    
- EXISTS
    
    
- CTE
