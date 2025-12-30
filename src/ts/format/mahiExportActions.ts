import {isFormatMahiEntity, MAHI_CODEC} from "./mahiEntityFormat";

const exportModel: Action = new Action("export_model", {
    name: "Export Mahi Model",
    icon: "view_in_ar",
    condition: () => isFormatMahiEntity(),
    click: function() {
        MAHI_CODEC.export();
    }
});

export function loadMahiActions(): void {
    MenuBar.addAction(exportModel, "file.export.0");
}

export function unloadMahiActions(): void {
    exportModel.delete();
}
