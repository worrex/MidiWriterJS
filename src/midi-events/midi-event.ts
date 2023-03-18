interface MidiEvent {
    channel: number;
    data: number[];
    delta: number;
    status: number;
    type: string;
}
