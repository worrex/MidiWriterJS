interface MidiEvent extends AbstractEvent {
    channel: number;
    status: number;
    buildData?: Function;
}
