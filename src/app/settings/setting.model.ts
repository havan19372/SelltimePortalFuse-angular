export interface SettingModel{
    id: number | null,
    featureId : number | null,
    featureName: string,
    typeId: number | null,
    typeText: string,
    creator: string,
    createDate: string,
    key:string,
    value: string
}