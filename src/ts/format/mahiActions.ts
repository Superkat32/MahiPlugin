import {isFormatMahiEntity, MAHI_CODEC} from "./mahiEntityFormat";
import {CODEC_NAME} from "../constants";
import {addMonkeypatch, Monkeypatches, removeMonkeypatches} from "../utils";
import {openMahiProjectSettingsDialog} from "./mahiPluginProperties";

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

    addMonkeypatch(BarItems, "project_window", "click", monkeypatchMahiProjectWindowClick);
}

export function unloadMahiActions(): void {
    exportModel.delete();

    removeMonkeypatches()
}

export function monkeypatchMahiProjectWindowClick() {
    if (Format.id === CODEC_NAME) {
        openMahiProjectSettingsDialog();
    } else {
        return Monkeypatches.get(BarItems).click();
    }
}