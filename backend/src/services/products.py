products = {
    0: {"title": "Яблоко"},
    1: {"title": "Банан"},
    2: {"title": "Груша"}
}


def get_all_products(page: int = 1, products_per_page: int = 25):
    all_products = list(products.values())
    total = len(all_products)  # Всего элементов

    skip = (page - 1) * products_per_page # Элементы по номеру страницы
    if skip >= total: # "Ошибка пользователя при запросе несуществующей страницы"
        return {
            "products": [], # "Список товаров закончился"
            "total": total,
            "page": page,
            "per_page": products_per_page,
            "total_pages": (total + products_per_page - 1) // products_per_page,
            "has_next": False   # Далее не идем по страницам
        }
    paginated = all_products[skip:skip + products_per_page] # Ввыводим кол - во элементов постранично(пагинация же да)
    return {    # Вывод продуктов постранично, и данных о текущей странице, а так же расчет следующей
         "products": paginated,
        "total": total,
        "page": page,
        "per_page": products_per_page,
        "total_pages": (total + products_per_page - 1) // products_per_page,
        "has_next": (skip + products_per_page) < total
    }

def get_product_by_id(id: int):
    return products.get(id)
