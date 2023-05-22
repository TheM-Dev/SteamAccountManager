module.exports = (level) => {
    let size = 32;
    if (level < 0) return new Error("The level must be greater than 0");
    if (level > 5299) return new Error("The level must be less than 5299");

    return `<div class="${levelClass(level)}" style="font-size: ${level < 100 ? size / 1.75 : size / 2.28}px; height: ${size}px; width: ${size}px; line-height: ${level < 100 ? size - 2 : size}px; background-size: ${size}px; background-position: 0 ${-size * Math.trunc((level % 100) / 10)}px;">
    <span className="profileLevelNum">{level}</span>
</div>`

}

function levelClass(level){
    const lvl = Math.floor(level / 100) * 100 || Math.floor(level / 10) * 10;
    const lvl_plus = Math.floor((level - lvl) / 10) * 10;

    if (lvl < 100) return `lvl_${lvl}`;
    return `lvl_${lvl} lvl_plus_${lvl_plus}`;
}