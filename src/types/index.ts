export type Categorie = {
    id:number,
    name:string
    category:string
}

export type ActivityType = 'food' | 'exercise';

export type Activity = {
    id:number,
    type: ActivityType,
    category: string,
    name: string,
    calories: number
}

