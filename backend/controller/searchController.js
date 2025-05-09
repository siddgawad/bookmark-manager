import Bookmark from "../models/bookMarkModel.js";


const searchController = async function (req,res){
    const {searchText} = req.body;
    if(!searchText || typeof searchText!=="string" || !searchText.trim()) return res.status(400).json({message:"Enter valid text to search"});

    try{
        const result = await Bookmark.find({
            $or:[ // $or to search across multiple fields
                {title:{$regex:searchText, $options:"i"}}, // Uses $regex with case-insensitive (i) option for partial matches.
                { category: { $regex: searchText, $options: "i" } },
                {collection:{$regex:searchText,$options:"i"}},
                {tags:{$regex:searchText,$options:"i"}}
            ]
        }, "_id title collection tags").limit(20);

        if(!result.length){
            return res.status(404).json({message:"No results found!"});
        }
        return res.status(200).json({data:result});
    }catch(err){
        console.error("Search failed:",err);
        return res.status(500).json({message:"Internal server error"});
    }

};



export default searchController;