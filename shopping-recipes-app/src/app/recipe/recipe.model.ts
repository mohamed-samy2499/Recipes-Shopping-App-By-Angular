export class Recipe{
    public name: string ;
    public description: string;
    public imagePath: string;
    constructor(name:string ='A', desc:string='B' , imagePath:string='C')
    {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}