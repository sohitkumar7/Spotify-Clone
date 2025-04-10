import React from "react";
import { useNavigate } from "react-router-dom";

function Albumitems({ image, name, desc, id }) {
  const navigate = useNavigate();

  return (
    <div
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
      onClick={() => navigate("/album/" + id)}
    >
      <img src={image} alt="" className="rounded w-[160px] " />
      <p className="font-bold mt-2 mb-1">{name.slice(0, 12)}..</p>
      <p className=" text-sm text-slate-200">{desc.slice(0, 18)}..</p>
    </div>
  );
}

export default Albumitems;
