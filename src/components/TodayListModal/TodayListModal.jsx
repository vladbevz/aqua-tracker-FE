import { MdClose } from "react-icons/md";

export const TodayListModal = ({closeModal}) => {
    return (
        <div>
            <p>TodayListModal</p>
            <button onClick={closeModal} >
                <MdClose />
            </button>
        </div>
    )
}
