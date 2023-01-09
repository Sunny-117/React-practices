export default async function () {
    return new Promise(function (resolve) {
        resolve(
            [
                {
                    "value": "北京",
                    "label": "北京",
                    "children": [
                        {
                            "value": "北京1-1",
                            "label": "北京1-2"
                        },
                        {
                            "value": "北京2-1",
                            "label": "北京2-2"
                        }
                    ]
                },
                {
                    "value": "天津",
                    "label": "天津",
                    "children": [
                        {
                            "value": "天津1-1",
                            "label": "天津1-2"
                        },
                        {
                            "value": "天津2-1",
                            "label": "天津2-2",
                            "children": [
                                {
                                    "value": "天津2-1-1",
                                    "label": "天津2-1-1"
                                },
                                {
                                    "value": "天津2-1-2",
                                    "label": "天津2-1-2"
                                }
                            ]
                        }
                    ]
                }
            ]
        )
    })
}