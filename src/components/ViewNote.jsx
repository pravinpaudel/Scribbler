import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const ViewNote = () => {
  const { id } = useParams();
  const allNotes = useSelector((state) => state.notes.notes);
  const currentNote = allNotes.filter((n) => n?._id == id);
  let title = "";
  let value = "";

  if (currentNote) {
    title = currentNote[0].title;
    value = currentNote[0].content;
  }

  return (
    <div className="w-full min-w-[600px] max-w-[1200px] h-full mt-5 mx-auto lg:px-0 border border-[#CECECE] rounded-lg shadow-md">
      
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 px-2 py-2 rounded-t-lg border-b border-[#CECECE">
        {/* Mac-like dots */}
        <div className="flex gap-1.5 ml-2">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full hover:opacity-80"></div>
            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full hover:opacity-80"></div>
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full hover:opacity-80"></div>
        </div>
      </div>

      <div className="p-5"> 
      <div className="w-full flex flex-row">
        <input
          disabled
          type="text"
          placeholder="Enter your title"
          className="text-black  min-w-[700px] pl-3 rounded-md outline-none border mr-2 focus:shadow-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <div className="flex gap-2"> */}
          <NavLink to={`/?noteId=${id}`} className="p-2 border border-[#CECECE] rounded-lg hover:bg-[#f7fafc] mr-2">
            <i className="material-icons inline-block pt-2 ">
              edit
            </i>
          </NavLink>
        {/* </div> */}

        <button className="note-btn rounded-lg outline-none border-none hover:border-none"
          onClick={() => {
            navigator.clipboard.writeText(value);
            toast.success("Copied Successfully!!");
          }}
        >
          <i className="material-icons ">
            content_copy
          </i>
        </button>
      </div>
      <div className="mt-2">
        <textarea
          disabled
          className="mt-2 rounded-xl outline outline-[#CECECE] p-4 min-w-[800px] focus:shadow-md text-black"
          value={value}
          rows={20}
        />
      </div>
      </div>
    </div>

//     <div className="w-full min-w-[600px] max-w-[1200px] h-full py-5 mt-5 mx-auto px-5 lg:px-0 border border-[#CECECE] rounded-lg shadow-md bg-white">
    
//     <div className="flex items-center mb-4">
//         <div className="flex gap-2 p-2">
//             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//             <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//         </div>
//     </div>
    
    
//     <div className="w-full flex flex-row gap-2 mb-4">
//         <input
//             disabled
//             type="text"
//             placeholder="Enter your title"
//             className="text-black w-full pl-3 rounded-md outline-none border border-gray-300 mr-2 focus:shadow-md"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//         />
//         <NavLink to={`/?noteId=${id}`} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
//             <i className="material-icons inline-block">
//                 edit
//             </i>
//         </NavLink>
//         <button className="note-btn rounded-lg outline-none border-none hover:bg-gray-100"
//             onClick={() => {
//                 navigator.clipboard.writeText(value);
//                 toast.success("Copied Successfully!!");
//             }}
//         >
//             <i className="material-icons">
//                 content_copy
//             </i>
//         </button>
//     </div>
    
//     <div className="mt-2">
//         <textarea
//             disabled
//             className="w-full mt-2 rounded-xl outline outline-gray-300 p-4 focus:shadow-md text-black"
//             value={value}
//             rows={20}
//         ></textarea>
//     </div>
// </div>

  );
};

export default ViewNote;
