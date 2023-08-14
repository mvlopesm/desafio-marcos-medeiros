class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };
    const formasDePagamento = ["debito", "credito", "dinheiro"];

    // Verificações iniciais, método e se existem itens
    if (!formasDePagamento.has(metodoDePagamento) || itens.length === 0) {
      return itens.length === 0
        ? "Não há itens no carrinho de compra!"
        : "Forma de pagamento inválida!";
    }

    let valorTotal = 0;
    const desconto = 0.05;
    const acrescimo = 0.03;
    const itemQuantidade = {};

    // Passar por todos os itens recebidos
    for (const item of itens) {
      // Fazendo a separação do item recebido
      const [itemCardapio, quantidade] = item.split(",");

      // Verificando se o item existe no cardapio
      if (!cardapio.hasOwnProperty(itemCardapio)) {
        return "Item inválido!";
      }

      const valorItem = cardapio[itemCardapio];

      // Verificação de quantidade
      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }

      if (itemQuantidade[itemCardapio]) {
        itemQuantidade[itemCardapio] += quantidade;
      } else {
        itemQuantidade[itemCardapio] = quantidade;
      }

      valorTotal += valorItem * quantidade;
    }

    // Verificações de itens extra
    if (
      itemQuantidade["chantily"] &&
      (!itemQuantidade["cafe"] || itemQuantidade["cafe"] <= 0)
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (
      itemQuantidade["queijo"] &&
      (!itemQuantidade["sanduiche"] || itemQuantidade["sanduiche"] <= 0)
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    // Verificação da mudança de valor conforme método de pagamento
    if (metodoDePagamento === "dinheiro") {
      valorTotal = valorTotal * (1 - desconto);
    } else if (metodoDePagamento === "credito") {
      valorTotal = valorTotal * (1 + acrescimo);
    }

    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
