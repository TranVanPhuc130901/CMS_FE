interface Inav {
    id: number,
    name: string,
    image: string,
    idCategory : number
}

const GroupItem : Inav [] = [
    {
    id: 1,
    name: 'Login',
    image: 'user-following.svg',
    idCategory: 1
    },
    {
        id: 2,
        name: 'Logout',
        image: 'user-unfollow.svg',
        idCategory: 1
    },
    {
        id: 3,
        name: 'Regester',
        image: 'user-add.svg',
        idCategory: 1
    },
    {
        id: 4,
        name: 'ProductList',
        image: 'user-add.svg',
        idCategory: 2
    },
    {
        id: 4,
        name: 'Authoziration User',
        image: 'user-add.svg',
        idCategory: 3
    },
    {
        id: 5,
        name: 'Article',
        image: 'user-add.svg',
        idCategory: 4
    },
    {
        id: 6,
        name: 'ListCart',
        image: 'user-add.svg',
        idCategory: 5
    },
]

export default GroupItem