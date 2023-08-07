export default function resolveType(source, acceptedTypes){
    
    let ext = source.split('.').slice(-1)[0];
    ext = ext.toLowerCase()
    // console.log(ext);
    return acceptedTypes[ext]||''
}