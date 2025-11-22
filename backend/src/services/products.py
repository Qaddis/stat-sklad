products = {
    0: {"title": "Яблоко"},
    1: {"title": "Банан"},
    2: {"title": "Груша"}
}


def get_all_products():
    return [product for product in products.values()]


def get_product_by_id(id: int):
    return products.get(id)
