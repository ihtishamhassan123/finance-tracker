import { FaSackDollar } from "react-icons/fa6";
import { TbShoppingCartDollar } from "react-icons/tb";
import { TfiWallet } from "react-icons/tfi";
export const featuresarr =[
    {
        id : 1,
        title : 'Track Incone',
        desc : "Record salary, freelance earnings, and other income sources to keep track of your cash flow.",
        icons : <FaSackDollar/>,
        color : 'green'
    },
     {
        id : 2,
        title : 'Track Expense',
        desc : "Monitor spending, organize expenses by category, and gain better control of your budget.",
        icons : <TbShoppingCartDollar/>,
        color : "red"
    },
     {
        id : 3,
        title : 'Monitor Balance',
        desc : "Stay informed about your financial health with a clear overview of your current balance.",
        icons : <TfiWallet />
,
        color : 'blue'
    },
]