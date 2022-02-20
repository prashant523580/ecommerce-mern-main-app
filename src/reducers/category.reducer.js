import { CategoryConstants } from "../actions/constant";

const initState = {
    categories: [],
    loading: false,
    error: null
};

//common category push
const buildNewCategories = (parentId, categories, category) => {
    let newCategory = [];
    if (parentId === undefined) {
        return [
            ...categories, {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }
    for (let cate of categories) {
        if (cate._id === parentId) {

            newCategory.push({
                ...cate,
                children: cate.children ? buildNewCategories(parentId, cate.children, {
                    _id: category._id,
                    name: category.name,
                    slug: cate.slug,
                    parentId: category.parentId,
                    children: category.children,

                }, category) : []
            })
        } else {

            newCategory.push({
                ...cate,
                children: cate.children ? buildNewCategories(parentId, cate.children, category) : [],

            })
        }
    }
    return newCategory;
}
export default (state = initState, action) => {
    switch (action.type) {
        case CategoryConstants.GET_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case CategoryConstants.ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case CategoryConstants.ADD_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updateCategory = buildNewCategories(category.parentId, state.categories, category);
            console.log(updateCategory)
            state = {
                ...state,
                categories: updateCategory,
                loading: false,
            }
            break;
        case CategoryConstants.ADD_CATEGORY_FAILURE:
            state = {
                ...initState
            }
            break;
    }
    return state;
}