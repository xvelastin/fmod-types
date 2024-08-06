// Type definitions for the FMOD Studio Scripting API
// Project: https://www.fmod.com/docs/2.03/studio/scripting-api-reference.html
// Definitions by: Michael Hartung <https://hartung.studio>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Fmod {

//  ███████ ███    ██ ████████ ██ ████████ ██    ██ 
//  ██      ████   ██    ██    ██    ██     ██  ██  
//  █████   ██ ██  ██    ██    ██    ██      ████   
//  ██      ██  ██ ██    ██    ██    ██       ██    
//  ███████ ██   ████    ██    ██    ██       ██    

    interface PropertyDescription {
        dataType: string;
        // biome-ignore lint/suspicious/noExplicitAny: can be anything
        defaultValue: any;
    }

    interface Entity<T> {
        isAbstract: boolean;
        isGlobal: boolean;
        isSingleton: boolean;
        properties: PropertyDescription[];
        superentities: string[];
        document(): string;
        findInstances(arg?: { searchContext: object, includeDerivedTypes: boolean }): T[];
        singletonInstance: Entity<T>;
    }

    interface ADSRModulator extends Modulator {
        initialValue: number;
        attackTime: number;
        attackShape: number;
        peakValue: number;
        holdTime: number;
        decayTime: number;
        decayShape: number;
        sustainValue: number;
        releaseTime: number;
        releaseShape: number;
        finalValue: number;
    }

    interface ActionSheet extends Parameter {
        name: "Actions";
    }

    interface Asset extends Notable, Colorable {
        assetPath: string;
        masterAssetFolder: MasterAssetFolder;
        getAssetPath(): string;
        setAssetPath(path: string): boolean;
        getAbsoluteAssetPath(): string;
    }

    interface AudioFile extends EncodableAsset,
        ReferenceableData, ProgrammerSoundPlaceholder {
        isStreaming: boolean;
        frequencyInKHz: number;
        channelCount: number;
        length: number;
        sounds: SingleSound[];
    }

    interface AudioSettings extends ManagedObject {
        driverName: string;
        deviceId: string;
        deviceName: string;
        forcedBlockSize: number;
    }
    interface AudioTable extends WorkspaceItem<AudioTable>, Encodable, ProgrammerSoundPlaceholder {
        sourceDirectory: string;
        includeSubDirectories: boolean;
        isLocalized: boolean;
        bank: Bank;
    }

    interface AudioTrack extends Track {
        uiAutomationTracksVisible: boolean;
        automationTracks: AutomationTrack[];
        modules: Module[];
        addAutomationTrack(automatableObject: AutomatableObject, propertyName: string): AutomationTrack;
    }

    interface AutomatableObject extends ManagedObject {
        uiModulationDrawerVisible: boolean;
        uiTriggerBehaviorDrawerVisible: boolean;
        automators: Automator[];
        modulators: Modulator[];
        snapshotProperties: SnapshotProperty[];
        customBindings: ControlSurfaceCustomBinding[];
        addAutomator(propertyName: string): Automator;
        addModulator(modulatorType: ModulatorType, propertyName: string): Modulator;
    }

    interface AutomationCurve extends ManagedObject {
        automator: Automator;
        parameter: ParameterPrototype;
        automationPoints: AutomationPoint[];
        addAutomationPoint(position: number, value: number): void;
    }

    interface AutomationPoint extends Selectable {
        position: number;
        value: number;
        curveShape: number;
        isSCurve: boolean;
        automationCurve: AutomationCurve;
        startPointOwner: FadeCurve;
        endPointOwner: FadeCurve;
    }

    interface AutomationTrack extends Track {
        automator: Automator;
        audioTrack: AudioTrack;
    }

    interface Automator extends ManagedObject {
        nameOfPropertyBeingAutomated: string;
        objectBeingAutomated: AutomatableObject;
        automationCurves: AutomationCurve[];
        automationTracks: AutomationTrack[];
        addAutomationCurve(parameter: GameParameter | Timeline): AutomationCurve;
    }

    interface AutopitchModulator extends Modulator {
        root: number;
        pitchAtMinimum: number;
    }

    interface Bank extends WorkspaceItem<Bank> {
        isMasterBank: boolean;
        dontLoopOptionEnabled: boolean;
        folder: BankFolder;
        audioTable: AudioTable;
        events: Event[];
    }

    interface BankFolder extends Folder<Bank> {}

    interface BoolPluginParameter extends PluginParameter {
        value: boolean;
    }

    interface ChannelMixEffect extends MixerEffect {
        outputGrouping: EChannelMixEffectOutputGrouping[keyof EChannelMixEffectOutputGrouping];
        gain00: number;
        gain01: number;
        gain02: number;
        gain03: number;
        gain04: number;
        gain05: number;
        gain06: number;
        gain07: number;
        gain08: number;
        gain09: number;
        gain10: number;
        gain11: number;
        gain12: number;
        gain13: number;
        gain14: number;
        gain15: number;
        gain16: number;
        gain17: number;
        gain18: number;
        gain19: number;
        gain20: number;
        gain21: number;
        gain22: number;
        gain23: number;
        gain24: number;
        gain25: number;
        gain26: number;
        gain27: number;
        gain28: number;
        gain29: number;
        gain30: number;
        gain31: number;
        output00: 0
        output01: 1
        output02: 2
        output03: 3
        output04: 4
        output05: 5
        output06: 6
        output07: 7
        output08: 8
        output09: 9
        output10: 10
        output11: 11
        output12: 12
        output13: 13
        output14: 14
        output15: 15
        output16: 16
        output17: 17
        output18: 18
        output19: 19
        output20: 20
        output21: 21
        output22: 22
        output23: 23
        output24: 24
        output25: 25
        output26: 26
        output27: 27
        output28: 28
        output29: 29
        output30: 30
        output31: 31
    }

    interface ChorusEffect extends MixerEffect {
        rate: number;
        depth: number;
        mix: number;
    }

    interface Colorable extends ManagedObject {
        color: string;
    }

    interface CommandSound extends Sound {
        commandType: ECommandType[keyof ECommandType];
        targetValue: number;
        commandTarget: CommandTarget;
    }

    interface CommandTarget extends ManagedObject {
        commandSounds: CommandSound[];
    }

    interface CompressorEffect extends MixerEffect, SidechainTarget {
        threshold: number;
        ratio: number;
        attackTime: number;
        releaseTime: number;
        gain: number;
        linkChannels: boolean;
    }

    interface ControlSurface extends ManagedObject {
        name: string;
        color: string;
        customBindings: ControlSurfaceCustomBindings[];
        protocols: ControlSurfaceProtocol;
    }

    interface ControlSurfaceCustomBinding extends ManagedObject {
        owner: ControlSurfaceCustomBindings;
        linkedObject: AutomatableObject;
    }

    interface ControlSurfaceCustomBindings extends ManagedObject {
        customBindings: ControlSurfaceCustomBinding[];
        workspace: Workspace;
        controlSurface: ControlSurface;
    }

    interface ControlSurfaceProtocol extends ManagedObject {
        controlSurface: ControlSurface;
    }

    interface ConvolutionReverbEffect extends MixerEffect, DataReferee {
        startFrame: number;
        endFrame: number;
        wetLevel: number;
        dryLevel: number;
        linkChannels: boolean;
        setIRFromFilePath(filePath: string): void;
    }

    interface DAWAsset extends AudioFile {
        project: DAWProject;
    }

    interface DAWProject extends EncodableAsset {
        dawProjectPath: string;
        renderedAssetsPath: string;
        assets: DAWAsset[];
    }

    interface DataFile extends Asset, ReferenceableData {}

    interface DataPluginParameter extends PluginParameter, DataReferee {
        name: string;
        value: ArrayBuffer;
        dataType: number;
    }

    interface DataReferee extends ManagedObject {
        referenceableData: ReferenceableData;
    }

    interface DelayEffect extends MixerEffect {
        delay: number;
        feedback: number;
        level: number;
        dryLevel: number;
    }
    interface DistortionEffect extends MixerEffect {
        level: number;
    }
    interface EditorSettings extends ManagedObject {
        forcedDevicePixelRatio: number;
        followCursor: boolean;
        loopPlayback: boolean;
        autoplayAudioFilePlayback: boolean;
        loopAudioFilePlayback: boolean;
        compressedAudioFilePlayback: boolean;
        preferredOpenItemMethod: boolean;
        snapToItems: boolean;
        snapToRuler: boolean;
        showMarkerLines: boolean;
        showAutomationPointValues: boolean;
        showOverlappingInstrumentsInLanes: boolean;
        bulkEditEnabled: boolean;
        initialSyncEnabled: boolean;
        liveUpdateSyncConnectedPlatform: boolean;
        liveUpdateDisableStreamingSounds: boolean;
        apiPlaybackEnabled: boolean;
        mixerStripWidth: number;
        mixerStripHeight: number;
        mixerStripShowsEffects: boolean;
        mixerStripShowsSends: boolean;
        mixerStripShowsMacros: boolean;
        mixerStripShowsOutputs: boolean;
        defaultProfilerGraphType: EProfilerGraphType[keyof EProfilerGraphType];
        profilerTableValueMode: EProfilerTableValueMode[keyof EProfilerTableValueMode];
        profilerTableVisibleColumns: string[];
        // biome-ignore lint/suspicious/noExplicitAny: unclear where this is set
        profilerAutomaticScopeInMode: any;
        autoSaveEnabled: boolean;
        startupMode: EStartupMode[keyof EStartupMode];
        editorScrollModeNoModifier: EScrollMode[keyof EScrollMode];
        editorScrollModeShiftModifier: EScrollMode[keyof EScrollMode];
        editorScrollModeAltModifier: EScrollMode[keyof EScrollMode];
        editorScrollModeControlModifier: EScrollMode[keyof EScrollMode];
        birdsEyeDragMode: EBirdsEyeDragMode[keyof EBirdsEyeDragMode];
        buildThreadCount: number;
        emailAddress: string;
        recentFiles: string[];
        recentIpAddress: string[];
        liveUpdateAutoReconnect: boolean;
        recentVersionOpened: number;
        sampleEditor: string;
        showOnlyKnownAudioFileTypes: boolean;
        recentImportFolder: string;
        absoluteMouseModeEnabled: boolean;
        analyticsEnabled: boolean;
        timeDisplayMode: ETimeDisplayMode[keyof ETimeDisplayMode];
        keyboardShortcuts: Record<number, string>; // NOTE: verify 
        uiDefaultTrackHeight: number;
        uiAutomationTracksVisible: EUIAutomationTracksVisible[keyof EUIAutomationTracksVisible];
        uiModulationDrawerVisible: EUIModulationDrawerVisible[keyof EUIModulationDrawerVisible];
        uiTriggerBehaviorDrawerVisible: EUITriggerBehaviorDrawerVisible[keyof EUITriggerBehaviorDrawerVisible];
        uiView3DOrtho: boolean;
        uiView3DFront: boolean;
        uiView3DSize: number;
        linkedAssetsRenderMode: ELinkedAssetsRenderMode[keyof ELinkedAssetsRenderMode];
        linkedAssetsRemovalMode: ELinkedAssetsRemovalMode[keyof ELinkedAssetsRemovalMode];
        reaperApplicationPath: string;
        eventsBrowserSharesSelection: boolean;
    }

    interface EffectChain extends MixerEffect {
        effects: MixerEffect[];
    }

    interface EffectPreset extends WorkspaceItem<EffectPreset> {
        folder: EffectPresetFolder;
        effect: MixerEffect;
        proxies: ProxyEffect;
    }

    interface EffectPresetFolder extends Folder<EffectPreset> {}

    interface Encodable extends ManagedObject {
        encodingSettings: EncodingSetting[];
    }

    interface EncodableAsset extends Asset, Encodable {}

    interface EncodingSetting extends ManagedObject {
        encodingFormat: EEncodingFormat[keyof EEncodingFormat];
        quality: number;
        sampleRateMode: ESampleRateMode;
        sampleRate: number;
        loadingMode: ELoadingMode[keyof ELoadingMode];
        platform: Platform;
        encodable: Encodable;
    }

    interface Event extends EventFolder, Selector, Taggable, CommandTarget,
        ProfilerTrackable, ProfilerGraphable {
        isDefault: boolean;
        outputFormat: EChannelFormat[keyof EChannelFormat];
        uiMarkerTracksVisible: boolean;
        uiMaxMarkerTracksVisible: boolean;
        uiLastParameterSelection: Parameter;
        mixer: EventMixer;
        masterTrack: MasterTrack;
        mixerInput: MixerInput;
        automatableProperties: EventAutomatableProperties;
        markerTracks: MarkerTrack[];
        groupTracks: GroupTrack[];
        returnTracks: ReturnTrack[];
        timeline: Timeline;
        parameters: Parameter[];
        userProperties: UserProperty[];
        references: EventSound[];
        sandboxEmitters: SandboxEmitter[];
        banks: Bank[];
        defaultEvent: Event;
        clonedEvents: Event[];
        isPlaying(): boolean;
        isPaused(): boolean;
        isStopping(): boolean;
        isRecording(): boolean;
        is3D(): boolean;
        isOneShot(): boolean;
        play(): void;
        togglePause(): void;
        stopImmediate(): void;
        returnToStart(): void;
        keyOff(): void;
        toggleRecording(): void;
        getPath(): string;
        get3DAttributes(): Event3DAttributes;
        set3DAttributes(attributes: Event3DAttributes): void;
        getCursorPosition(parameter: GameParameter | Timeline): void;
        setCursorPosition(parameter: GameParameter | Timeline, position: number): void;
        getParameterPresets(): GameParameter[];
        addGameParameter(parameterDefinition: ParameterPreset | GameParameter): GameParameter;
        addGroupTrack(name: string): GroupTrack;
        addReturnTrack(name: string): ReturnTrack;
        addMarkerTrack(): MarkerTrack;
    }

    interface EventAutomatableProperties extends AutomatableObject {
        isPersistent: boolean;
        maxVoices: number;
        voiceStealing: EVoiceStealing[keyof EVoiceStealing];
        priority: number;
        dopplerEnabled: boolean;
        dopplerScale: number;
        snapshotIntensity: number;
        minimumDistance: number;
        maximumDistance: number;
        noLookahead: boolean;
        triggerCooldown: number;
        sampleDataLoadingMode: number;
        event: Event;
    }

    interface EventCondition extends TriggerCondition {
        eventState: EEventState[keyof EEventState];
    }

    interface EventFolder extends Folder<Event> {}

    interface EventMixer extends Mixer {
        event: Event;
    }

    interface EventMixerGroup extends MixerGroup, Selectable {
        groupTrack: GroupTrack;
    }

    interface EventMixerMaster extends MixerMaster, Selectable {
        groupTrack: MasterTrack;
    }

    interface EventMixerReturn extends MixerReturn, Selectable {
        returnTrack: ReturnTrack;
    }

    interface EventSound extends Sound {
        event: Event;
        parameters: ParameterProperty[];
    }

    interface FadeCurve extends ManagedObject {
        startPoint: AutomationPoint;
        endPoint: AutomationPoint;
        fadeInOwner: Module;
        fadeOutOwner: Module;
        relatedModule: Module;
    }

    interface FlangerEffect extends MixerEffect {
        rate: number;
        delay: number;
        mix: number;
    }

    interface FloatPluginParameter extends PluginParameter {
        value: number;
    }

    // NOTE(mhartung) not entirely sure this this generic approach is good
    interface Folder<T> extends WorkspaceItem<T> {
        items: T[];
        workspace: Workspace;
        getItem(path: string): WorkspaceItem<T> | undefined;
    }

    interface GainEffect extends MixerEffect {
        gain: number;
    }

    interface GameParameter extends AutomatableObject,
        ParameterPrototype, CommandTarget,
        Selectable, ProfilerGraphable {
        parameterType: EParameterType[keyof EParameterType];
        minimum: number;
        maximum: number;
        enumerationLabels: string[];
        isGlobal: boolean;
        isReadOnly: boolean;
        isHeld: boolean;
        initialValue: number;
        velocity: number;
        seekSpeed: number;
        seekSpeedDescending: number;
        seekSpeedAsymmetric: number;
        cursorPosition: number;
        isExposedRecursively: boolean;
        proxies: ParameterProxy[];
        parameterConditions: ParameterCondition[];
        sandboxParameters: SandboxParameter[];
        getCursorPosition(): number;
        setCursorPosition(position: number): void;
    }

    interface GroupTrack extends AudioTrack, PlatformSpecificItem {
        streaming: boolean;
        mixerGroup: EventMixerGroup;
        event: Event;
        addSound(parameter: GameParameter, soundType: SoundType, start: number, length: number): Sound;
    }

    interface HighpassEffect extends MixerEffect {
        cutoff: number;
        resonance: number;
    }

    interface HighpassSimpleEffect extends MixerEffect {
        cutoff: number;
    }

    interface ITEchoEffect extends MixerEffect {
        wetDryMix: number;
        feedback: number;
        leftDelay: number;
        rightDelay: number;
        panDelay: number;
    }

    interface IntPluginParameter extends PluginParameter {
        value: number;
    }

    interface LFOModulator extends Modulator {
        shape: ELFOShape[keyof ELFOShape];
        isTempoSync: boolean;
        rate: number;
        beats: number;
        phase: number;
        depth: number;
        direction: number;
    }

    interface LimiterEffect extends MixerEffect {
        boost: number;
        ceiling: number;
        release: number;
        linkChannels: boolean;
    }

    interface Locale extends ManagedObject {
        name: string;
        localeCode: string;
        uiActiveLocaleOwner: ProjectSettings;
        workspace: Workspace;
    }

    interface LoopRegion extends Region, Triggerable, Quantizable,
        TransitionDestination, TransitionTimelineOwner {
        looping: boolean;
    }

    interface Loopable extends ManagedObject {
        looping: boolean;
        playCount: number;
    }

    interface LoudnessMeter extends MixerEffect {
        meterRange: ELoudnessMeterRange[keyof ELoudnessMeterRange];
        meterMode: ELoudnessMeterMode[keyof ELoudnessMeterMode];
        loudnessTarget: number;
        loudnessScale: ELoudnessMeterScale[keyof ELoudnessMeterScale];
    }

    interface LowpassEffect extends MixerEffect {
        cutoff: number;
        resonance: number;
    }

    interface LowpassSimpleEffect extends MixerEffect {
        cutoff: number;
    }

    interface MackieControlSurface extends ControlSurface {}

    interface MackieExtendedControlSurface extends ControlSurface {}

    interface ManagedObject {
        entity: string;
        id: string;
        isValid(): boolean;
        properties: ManagedPropertyMap;
        relationships: ManagedRelationshipMap;
        isOfType(entityName: EntityName): boolean;
        isOfExactType(entityName: EntityName): boolean;
        dump(): string;
        document(): string;
    }

    interface ManagedProperty {
        parent: ManagedObject;
        name: string;
        // biome-ignore lint/suspicious/noExplicitAny: can be anything
        dataType: any;
        // biome-ignore lint/suspicious/noExplicitAny: can be anything
        value: any;
        // biome-ignore lint/suspicious/noExplicitAny: can be anything
        defaultValue: any;
        // biome-ignore lint/suspicious/noExplicitAny: can be anything
        setValue(value: any): boolean;
        dump(): string;
    }

    interface ManagedPropertyMapBase {
        parent: ManagedObject;
        dump(): string;
    }

    interface ManagedPropertyMapByName {
        [key: string]: ManagedProperty;
    }

    type ManagedPropertyMap = ManagedPropertyMapBase & ManagedPropertyMapByName;

    interface ManagedRelationship {
        parent: ManagedObject;
        name: string;
        cardinality: 'ToOne' | 'ToMany';
        ordering: 'None' | 'Ordered' | 'Transient';
        destinations: ManagedObject[];
        add(obj: ManagedObject): boolean;
        insert(index: number, obj: ManagedObject): boolean;
        remove(obj: ManagedObject): boolean;
        dump(): string;
    }

    interface ManagedRelationshipMapBase {
        parent: ManagedObject;
        dump(): string;
    }

    interface ManagedRelationshipByName {
        [key: string]: ManagedRelationship;
    }

    type ManagedRelationshipMap = ManagedPropertyMapBase & ManagedRelationshipByName;

    interface Marker extends AutomatableObject, Selectable {
        position: number;
        selector: Selector;
        timeline: Timeline;
        markerTrack: MarkerTrack;
    }

    interface MarkerTrack extends Track {
        selector: Selector;
        event: Event;
        markers: Marker[];
        addRegion(position: number, length: number, name: string, loopMode: ERegionLoopMode): Region;
        addTransitionMarker(position: number, destination: NamedMarker | LoopRegion): TransitionMarker;
        addTransitionRegion(position: number, length: number, destination: NamedMarker | LoopRegion): TransitionRegion;
        addSustainPoint(position: number): SustainPoint;
    }

    interface MasterAssetFolder extends EncodableAsset {
        assetDirectory: string;
        dawProjectSourceDirectory: string;
        streamingAssetThresholdLength: number;
        assets: Asset[];
        workspace: Workspace;
        getAsset(path: string): string;
    }

    interface MasterBankFolder extends BankFolder {}

    interface MasterEffectPresetFolder extends EffectPresetFolder {}

    interface MasterEventFolder extends EventFolder {}

    interface MasterParameterPresetFolder extends ParameterPresetFolder {}

    interface MasterSandboxFolder extends SandboxFolder {}

    interface MasterTagFolder extends TagFolder {}

    interface MasterTrack extends GroupTrack {}

    interface MeteringSettings extends ManagedObject {
        meterChannelOrdering: EMeteringChannelOrder[keyof EMeteringChannelOrder];
    }

    interface MidiControlSurfaceProtocol extends ControlSurfaceProtocol {
        inputPortName: string;
        outputPortName: string;
        inputPort: number;
        outputPort: number;
        controlSurface: ControlSurface;
    }

    interface Mixer extends ManagedObject {
        masterBus: MixerMaster;
        vca: MixerVCA;
        port: MixerPort;
        snapshotList: SnapshotList;
        snapshots: Snapshot;
        workspace: Workspace;
        uiMixerView: UiMixerView;
    }

    interface MixerBus extends MixerStrip {
        overridingInputFormat: EChannelFormat[keyof EChannelFormat];
        effectChain: MixerBusEffectChain;
        panner: MixerBusPanner;
        output: MixerGroup;
        getInputFormat(): EChannelFormat;
        getOutputFormat(): EChannelFormat;
    }

    interface MixerBusEffectChain extends EffectChain {
        effects: MixerEffect[];
        bus: MixerBus;
    }

    interface MixerBusFader extends MixerEffect {}

    interface MixerBusPanner extends PannerEffect {
        bus: MixerBus;
    }

    interface MixerEffect extends AutomatableObject, PlatformSpecificItem {
        bypass: boolean;
        owner: EffectChain;
        presetOwner: EffectPreset;
    }

    interface MixerGroup extends MixerBus {
        maxInstances: number;
        instanceStealing: EInstanceStealing[keyof EInstanceStealing];
        input: MixerBus[] | MixerSend[];
    }

    interface MixerInput extends MixerBus {
        event: Event;
    }

    interface MixerMaster extends MixerGroup {
        name: string;
        pitch: number;
        maxInstances: number;
        instanceStealing: EInstanceStealing[keyof EInstanceStealing];
        mixer: Mixer;
    }

    interface MixerPort extends MixerGroup {
        portType: EMixerPortType[keyof EMixerPortType];
        mixer: Mixer;
    }

    interface MixerReturn extends MixerGroup {
        name: string;
    }

    interface MixerSend extends MixerEffect {
        level: number;
        inputFormat: EChannelFormat[keyof EChannelFormat];
        mixerReturn: MixerReturn;
    }

    interface MixerStrip extends AutomatableObject, Notable,
        Colorable, ProfilerTrackable, ProfilerGraphable {
        volume: number;
        masters: MixerVCA[];
        snapshotTracks: SnapshotTrack[];
        uiMixerView: UiMixerView[];
        getPath(): string;
    }

    interface MixerVCA extends MixerStrip {
        name: string;
        slaves: MixerStrip[];
        mixer: Mixer;
    }

    interface Modulator extends AutomatableObject {
        nameOfPropertyBeingModulated: string;
        objectBeingModulated: AutomatableObject;
    }

    interface Module extends AutomatableObject, Selectable, Triggerable, Colorable {
        isAsync: boolean;
        isCutoff: boolean;
        start: number;
        length: number;
        delayType: EDelayType[keyof EDelayType];
        minimumTimeDelay: number;
        maximumTimeDelay: number;
        quantizationInterval: EQuantizationInterval;
        startOffset: number;
        timelockedOffset: number;
        voiceStealing: EVoiceStealing[keyof EVoiceStealing];
        maxVoices: number;
        name: string;
        fadeInCurve: FadeCurve;
        fadeOutCurve: FadeCurve;
        relatedFadeCurves: FadeCurve[];
        audioTrack: AudioTrack;
        parameter: Parameter;
    }

    interface MultiSound extends Sound, Loopable, Selector {
        playlistMode: EPlaylistMode[keyof EPlaylistMode];
        // biome-ignore lint/suspicious/noExplicitAny: unclear what this is
        playbackMode: any;
        selectables: Selectable[];
        sounds: Sound[];
        playPercentages: PlayPercentage[];
        scattererOwner: SoundScatterer;
    }

    interface MultibandEqEffect extends MixerEffect {
        filterTypeA: EMultibandEqEffectFilterType[keyof EMultibandEqEffectFilterType];
        filterTypeB: EMultibandEqEffectFilterType[keyof EMultibandEqEffectFilterType];
        filterTypeC: EMultibandEqEffectFilterType[keyof EMultibandEqEffectFilterType];
        filterTypeD: EMultibandEqEffectFilterType[keyof EMultibandEqEffectFilterType];
        filterTypeE: EMultibandEqEffectFilterType[keyof EMultibandEqEffectFilterType];
        frequencyA: number;
        frequencyB: number;
        frequencyC: number;
        frequencyD: number;
        frequencyE: number;
        qualityA: number;
        qualityB: number;
        qualityC: number;
        qualityD: number;
        qualityE: number;
        gainA: number;
        gainB: number;
        gainC: number;
        gainD: number;
        gainE: number;
    }

    interface NamedMarker extends Marker, TransitionDestination {
        name: string;
    }

    interface NamedWorkspaceBasedSourceControlProvider extends WorkspaceBasedSourceControlProvider {
        workspaceName: string;
    }

    interface Notable extends ManagedObject {
        note: string;
    }

    interface ObjectSpatialiserEffect extends SpatialEffect {}

    interface ObsoleteObject {}

    interface OscControlSurfaceProtocol extends ControlSurfaceProtocol {
        inputPort: number;
        outputPort: number;
        address: string;
        controlSurface: ControlSurface;
    }

    interface PannerEffect extends MixerEffect {
        stereoPan: number;
        stereoLeftPan: number;
        stereoRightPan: number;
        surroundPanDirection: number;
        surroundLFELevel: number;
        stereoToSurroundPanMode: EStereoToSurroundPanMode[keyof EStereoToSurroundPanMode];
        surroundStereoSeparation: number;
        surroundStereoAxis: number;
        surroundHeightBlend: number;
        overridingOutputFormat: EChannelFormat[keyof EChannelFormat];
        disabledSpeakers: number;
        LFEUpmixEnabled: number;
    }

    interface ParamEqEffect extends MixerEffect {
        centreFrequency: number;
        gain: number;
        bandwidth: number;
    }

    interface Parameter extends AutomatableObject {
        modules: Module[];
        event: Event;
        selector: Selector;
        eventSelector: Event;
        preset: GameParameter;
        getPlayheadPosition(): number;
    }

    interface ParameterCondition extends TriggerCondition {
        minimum: number;
        maximum: number;
        isInverted: boolean;
        parameter: GameParameter;
    }

    interface ParameterPreset extends WorkspaceItem<ParameterPreset> {
        parameter: GameParameter;
    }

    interface ParameterPresetFolder extends Folder<ParameterPreset> {}

    interface ParameterProperty extends AutomatableObject {
        position: number;
        parameter: ParameterProxy;
        owner: EventSound;
    }

    interface ParameterPrototype extends ManagedObject {
        automationCurves: AutomationCurve[];
    }

    interface ParameterProxy extends Parameter, Selectable {
        isProxyEnabled: boolean;
        markers: Marker[];
        getCursorPosition(): number;
        setCursorPosition(position: number): void;
    }

    interface PerforceProvider extends WorkspaceBasedSourceControlProvider {
        workspaceName: string;
        p4Port: string;
        p4Host: string;
        p4Charset: string;
        p4User: string;
        p4Password: string;
        p4WorkspaceForm: string;
    }

    interface PitchShifterEffect extends MixerEffect {
        pitch: number;
        fftSize: number;
        overlap: number;
        maxChannels: number;
    }

    interface Platform extends Encodable {
        // biome-ignore lint/suspicious/noExplicitAny: unclear what this is
        hardwareType: any;
        name: string;
        subDirectory: string;
        speakerFormat: EPlatformSpeakerFormat[keyof EPlatformSpeakerFormat];
        buildMetadataOnly: boolean;
        encodingSettings: EncodingSetting[];
        uiActivePlatformOwner: ProjectSettings;
        workspace: Workspace;
        associatedSettings: EncodingSetting[];
        excludedItems: PlatformSpecificItem[];
    }

    interface PlatformSpecificItem extends ManagedObject {
        excludedPlatforms: Platform[];
    }

    interface PlayPercentage extends ManagedObject {
        percentage: number;
        sound: Sound;
        owner: MultiSound;
    }

    interface Plugin extends ManagedObject {
        identifier: string;
        pluginParameters: PluginParameter[];
        owner: PluginOwner;
    }

    interface PluginEffect extends MixerEffect, PluginOwner, SidechainTarget {}

    interface PluginOwner extends ManagedObject {
        plugin: Plugin;
    }

    interface PluginParameter extends AutomatableObject {
        name: string;
        value: string | boolean | number | ArrayBuffer;
        plugin: Plugin;
    }

    interface PluginSettings extends ManagedObject {
        pluginFolders: string[];
    }

    interface PluginSound extends Sound, PluginOwner {}

    interface ProfilerFolder extends Folder<ProfilerSession> {}

    interface ProfilerGraph extends AutomationTrack {
        graphType: EProfilerGraphType;
        instanceId: number;
        objectBeingGraphed: ProfilerGraphable;
    }

    interface ProfilerGraphable extends ManagedObject {
        profilerGraphs: ProfilerGraph;
    }

    interface ProfilerRecordingMarker extends NamedMarker {}

    interface ProfilerSession extends Event {
        profilerTracks: ProfilerTrack;
        profilerSystemTrack: ProfilerSystemTrack;
    }

    interface ProfilerSessionFolder extends Folder<ProfilerFolder> {}

    interface ProfilerSystemTrack extends ProfilerTrack {}

    interface ProfilerTrack extends AudioTrack {
        profilerSession: ProfilerSession;
        objectBeingTracked: ProfilerTrackable;
    }

    interface ProfilerTrackable extends ManagedObject {
        profilerTrackers: ProfilerTrack;
    }

    interface ProgrammerSound extends Sound, Loopable {
        selectedKey: string;
        placeholder: ProgrammerSoundPlaceholder;
    }

    interface ProgrammerSoundPlaceholder extends ManagedObject {
        programmerSounds: ProgrammerSound[];
    }

    interface ProjectSettings extends ManagedObject {
        activeLocale: Locale;
        activePlatform: Platform;
        workspace: Workspace;
    }

    interface ProxyEffect extends MixerEffect {
        inputFormat: EChannelFormat[keyof EChannelFormat]; // NOTE: this is a guess
    }

    interface Quantizable extends ManagedObject {
        quantizationInterval: EQuantizationInterval;
        transitionOffset: ETransitionOffset[keyof ETransitionOffset];
    }

    interface RandomizerModulator extends Modulator {
        amount: number;
    }

    interface ReferenceableData extends ManagedObject {
        dataReferees: DataReferee[];
    }

    interface Region extends Marker {
        length: number;
    }

    interface ReturnTrack extends AudioTrack, PlatformSpecificItem {
        mixerReturn: EventMixerReturn;
        event: Event;
    }

    interface SFXReverbEffect extends MixerEffect {
        decayTime: number;
        earlyDelay: number;
        lateDelay: number;
        HFReference: number;
        HFDecayRatio: number;
        diffusion: number;
        density: number;
        lowShelfFrequency: number;
        lowShelfGain: number;
        highCut: number;
        earlyLateMix: number;
        wetLevel: number;
        dryLevel: number;
    }

    interface SandboxEmitter extends SandboxPositionable, SandboxParameterOwner {
        loopPlayback: boolean;
        sandboxParameters: SandboxParameter[];
        event: Event;
        scene: SandboxScene;
    }

    interface SandboxFolder extends Folder<SandboxScene> {}

    interface SandboxListener extends SandboxPositionable {
        scene: SandboxScene;
    }

    interface SandboxParameter extends ManagedObject {
        parameterValue: number;
        parameter: GameParameter;
        parameterOwner: SandboxParameterOwner;
    }

    interface SandboxParameterOwner extends ManagedObject {
        sandboxParameters: SandboxParameter[];
    }

    interface SandboxPositionable extends Selectable {
        positionX: number;
        positionY: number;
        rotationY: number;
    }

    interface SandboxScene extends Event, SandboxParameterOwner {
        uiLastSceneScale: number;
        uiLastSceneCenterX: number;
        uiLastSceneCenterZ: number;
        listeners: SandboxListener[];
        emitters: SandboxEmitter[];
    }

    interface ScriptBasedProvider extends SourceControlProvider {
        name: string;
        settings: string;
    }

    interface Selectable extends ManagedObject {
        selector: Selector;
    }

    interface Selector extends ManagedObject {
        selectables: Selectable[];
    }

    interface Sidechain extends MixerEffect {
        level: number;
        targets: SidechainTarget[];
    }

    interface SidechainModulator extends Modulator, SidechainTarget {
        levelMode: ESidechainModulatorLevelMode[keyof ESidechainModulatorLevelMode];
        amount: number;
        attackTime: number;
        releaseTime: number;
        minimumThreshold: number;
        maximumThreshold: number;
    }

    interface SidechainTarget extends ManagedObject {
        sidechains: Sidechain[];
    }

    interface SilenceSound extends Sound, Loopable {
        duration: number;
    }

    interface SingleSound extends Sound, Loopable {
        audioFile: AudioFile;
    }

    interface Snapshot extends Event {
        behavior: ESnapshotBehavior[keyof ESnapshotBehavior];
        snapshotMasterTrack: SnapshotMasterTrack;
        snapshotProperties: SnapshotProperty[];
        snapshotTracks: SnapshotTrack[];
    }

    interface SnapshotGroup extends Folder<WorkspaceItem<Snapshot>> {}

    interface SnapshotList extends SnapshotGroup {
        mixer: Mixer;
    }

    interface SnapshotMasterTrack extends AudioTrack, Colorable {
        snapshot: Snapshot;
    }

    interface SnapshotModule extends EventSound {
        intensity: number;
    }

    interface SnapshotProperty extends AutomatableObject {
        snapshot: Snapshot;
        automatableObject: AutomatableObject;
    }

    interface SnapshotTrack extends AudioTrack {
        snapshot: Snapshot;
        mixerStrip: MixerStrip;
    }

    interface Sound extends Module {
        volume: number;
        pitch: number;
        playPercentage: PlayPercentage;
        owner: MultiSound;
        setFadeInCurve(length: number, curveShape?: number /* -1.0 - 1.0 */): void;
        setFadeOutCurve(length: number, curveShape?: number /* -1.0 -1.0 */): void;
    }

    interface SoundScatterer extends Sound {
        polyphony: number;
        soundStealing: ESoundScattererSoundStealing[keyof ESoundScattererSoundStealing];
        totalSounds: number;
        spawnDelayType: EDelayType[keyof EDelayType];
        minimumTimeBetweenSounds: number;
        maximumTimeBetweenSounds: number;
        spawnQuantizationInterval: EQuantizationInterval;
        spawnRate: number;
        minimumScatterDistance: number;
        maximumScatterDistance: number;
        volumeRandomization: number;
        pitchRandomization: number;
    }

    interface SourceControlProvider extends ManagedObject {
        workspace: Workspace;
    }

    interface SpatialEffect extends MixerEffect {
        bypass: boolean;
        distanceRolloffType: EDistanceRolloffType[keyof EDistanceRolloffType];
        minimumDistance: number;
        maximumDistance: number;
        overrideRange: boolean;
        extentMode: EExtentMode[keyof EExtentMode];
        soundSize: number;
        minimumExtent: number;
    }

    interface SpatialiserEffect extends SpatialEffect {
        occlusionEnabled: boolean;
        dopplerMultiplier: number;
        panBlend: number;
        userPanDirection: number;
        userPanExtent: number;
        userLFELevel: number;
        LFEUpmixEnabled: boolean;
        stereoToSurroundUserPanMode: EStereoToSurroundPanMode[keyof EStereoToSurroundPanMode];
        userStereoSeparation: number;
        userStereoAxis: number;
    }

    interface SslNucleusControlSurface extends ControlSurface {}

    interface SustainPoint extends Marker, Triggerable {}

    interface Tag extends WorkspaceItem<Tag> {
        folder: TagFolder;
        taggables: Taggable[];
    }

    interface TagFolder extends Folder<Tag> {}

    interface Taggable extends ManagedObject {
        tags: Tag[];
    }

    interface TempoMarker extends Marker {
        tempo: number;
        timeSignatureNumerator: number;
        timeSignatureDenominator: number;
    }

    interface TfsProvider extends NamedWorkspaceBasedSourceControlProvider {
        serverURL: string;
        connectionPath: string;
        connectionPort: number;
        connectionProtocol: string;
        workspaceFormString: string;
    }

    interface ThreeEQEffect extends MixerEffect {
        lowGain: number;
        midGain: number;
        highGain: number;
        lowCrossover: number;
        highCrossover: number;
        crossoverSlope: number;
    }

    interface Timeline extends Parameter, ParameterPrototype {
        uiLastRulerScaleRatio: number;
        uiLastHorizontalScrollBarValue: number;
        isProxyEnabled: boolean;
        automationCurves: AutomationCurve[];
        markers: Marker[];
    }

    interface TouchOscControlSurface extends ControlSurface {}

    interface Track extends Selectable {
        uiTrackHeight: number;
    }

    interface TransceiverEffect extends MixerEffect {
        transmitMode: boolean;
        level: number;
        channel: number;
        speakerMode: ESpeakerMode[keyof ESpeakerMode];
    }

    interface TransitionDestination extends ManagedObject {
        name: string;
        references: TransitionTimelineOwner[];
    }

    interface TransitionDestinationFadeInCurve extends TransitionFadeCurve {}

    interface TransitionDestinationSound extends Module {
        name: string;
    }

    interface TransitionFadeCurve extends FadeCurve {}

    interface TransitionMarker extends Marker, TransitionTimelineOwner, Triggerable {
        transitionTimeline: TransitionTimeline;
    }

    interface TransitionRegion extends Region, TransitionTimelineOwner, Triggerable, Quantizable {}

    interface TransitionSourceFadeOutCurve extends TransitionFadeCurve {}

    interface TransitionSourceSound extends Module {}

    interface TransitionTimeline extends Timeline {
        length: number;
    }

    interface TransitionTimelineOwner extends ManagedObject {
        uiTransitionTimelineVisible: boolean;
        transitionTimeline: TransitionTimeline;
        destination: TransitionDestination;
    }

    interface TremoloEffect extends MixerEffect {
        frequency: number;
        depth: number;
        shape: number;
        skew: number;
        duty: number;
        square: number;
        phase: number;
        spread: number;
    }

    interface TriggerCondition extends AutomatableObject {
        owner: Triggerable;
    }

    interface Triggerable extends ManagedObject {
        triggerProbabilityEnabled: boolean;
        triggerProbability: number;
        triggerConditionMode: ETriggerConditionMode[keyof ETriggerConditionMode];
        triggerConditions: TriggerCondition[];
        addParameterCondition(parameter: ParameterPreset | GameParameter, min: number, max: number | undefined): ParameterCondition;
    }

    interface UiMixerView extends ManagedObject {
        name: string;
        assignedStrips: MixerStrip[];
        mixer: Mixer;
    }

    interface UserProperty extends ManagedObject {
        key: string;
        value: string;
        event: Event;
    }

    interface Workspace extends ManagedObject {
        isSourceControlForAssetsEnabled: boolean;
        isSourceControlForBuiltBanksEnabled: boolean;
        isSourceControlForProfilerSessionsEnabled: boolean;
        builtBanksOutputDirectory: string;
        builtBanksSeparateAssets: boolean;
        builtBanksSeparateStreams: boolean;
        builtBanksSeparateBankPerAsset: boolean;
        builtBanksIncludeFileNames: boolean;
        builtBanksIncludeReferencedEvents: boolean;
        builtBanksIncludeHash: boolean;
        builtBanksEncryptionKey: string;
        projectSettings: ProjectSettings;
        masterEventFolder: MasterEventFolder;
        masterTagFolder: MasterTagFolder;
        masterEffectPresetFolder: MasterEffectPresetFolder;
        masterParameterPresetFolder: MasterParameterPresetFolder;
        masterBankFolder: MasterBankFolder;
        masterSandboxFolder: MasterSandboxFolder;
        masterAssetFolder: MasterAssetFolder;
        sourceControlProvider: SourceControlProvider;
        changelist: WorkspaceChangelist;
        mixer: Mixer;
        profilerSessionFolder: ProfilerSessionFolder;
        platforms: Platform[];
        locales: Locale[];
        customBindings: ControlSurfaceCustomBindings[];
        addEvent(name: string, withSpatializer: boolean): Event;
        addGameParameter(parameterDefinition: ParameterPreset | GameParameter): GameParameter;
        addTag(name: string): Tag;
        createPlugin(identifier: string): PluginEffect | PluginSound;
    }

    interface WorkspaceBasedSourceControlProvider extends SourceControlProvider {
        repositoryLocation: string;
        workspaceRoot: string;
    }

    interface WorkspaceChangelist extends ManagedObject {
        filesOnHold: string[];
        filesExplicitlyLocked: string[];
        workspace: Workspace;
    }

    interface WorkspaceItem<T> extends Notable, Colorable {
        name: string;
        folder: Folder<T> | null; 
        getPath(): string;
    }

//  ██    ██ ██ 
//  ██    ██ ██ 
//  ██    ██ ██ 
//  ██    ██ ██ 
//   ██████  ██ 

    interface MenuItemDescription {
        name: string;
        execute: () => void;
        keySequence?: string;
        isEnabled?: boolean;
        isChecked?: boolean;
        subMenuItems?: MenuItemDescription[];
    }

    interface Menu {
        addMenuItem(description: MenuItemDescription): boolean;
        removeMenuItem(description: MenuItemDescription): boolean;
        menuItems(): MenuItemDescription[];
    }

    interface UIWidgetDescription {
        widgetId: string;
        isVisible?: boolean;
        isEnabled?: boolean;
        minimumWidth?: number;
        minimumHeight?: number;
        sizePolicy?: EUISizePolicy[keyof EUISizePolicy];
        alignment?: Readonly<EUIAlignment[keyof EUIAlignment]>;
        stretchFactor?: number;
        row?: Readonly<number>;
        column?: Readonly<number>;
        rowSpan?: Readonly<number>;
        columnSpan?: Readonly<number>;
        onConstructed?: () => void;
        onTimerEvent?: (timerId: string) => void;
    }

    interface UIRootWidget extends UIWidgetDescription {
        windowTitle: string;
        windowWidth?: number;
        windowHeight?: number;
        onClose?: () => void;
    }

    interface UIWidgetLabel extends UIWidgetDescription {
        widgetType: EUIWidgetType["Label"];
        text: string;
        wordWrap: boolean;
    }

    interface UIWidgetPushButton extends UIWidgetDescription {
        widgetType: EUIWidgetType["PushButton"];
        text: string;
        onClicked: () => void;
    }

    interface UIWidgetLineEdit extends UIWidgetDescription {
        widgetType: EUIWidgetType["LineEdit"];
        // text: () => string; // TODO
        isReadOnly: boolean;
        echoMode: EUIEchoMode[keyof EUIEchoMode];
        onTextEdited: () => void;
        onEditingFinished: () => void;
    }

    interface UIWidgetTextEdit extends UIWidgetDescription {
        widgetType: EUIWidgetType["TextEdit"];
        // text: () => string; // TODO
        // html: () => string; // TODO
        isReadOnly: boolean;
        onTextEdited: () => void;
        onEditingFinished: () => void;
    }

    interface UIWidgetComboBoxItem {
        text: string;
        // biome-ignore lint/suspicious/noExplicitAny: this can be anything
        userData: any[];
    }

    interface UIWidgetComboBox extends UIWidgetDescription {
        widgetType: EUIWidgetType["ComboBox"];
        items: UIWidgetComboBoxItem[];
        // currentIndex: () => number; // TODO
        currentText: Readonly<string>;
        // biome-ignore lint/suspicious/noExplicitAny: this can be anything
        currentUserData: Readonly<any>;
        onCurrentIndexChanged: () => void;
    }

    interface UIWidgetCheckBox extends UIWidgetDescription {
        widgetType: EUIWidgetType["CheckBox"];
        text: string;
        // isChecked: () => boolean; // TODO
        onToggled: () => void;
    }

    interface UIWidgetRange {
        minimum: number;
        maximum: number;
    }

    interface UIWidgetSlider extends UIWidgetDescription {
        widgetType: EUIWidgetType["Slider"];
        orientation: EUIOrientation[keyof EUIOrientation];
        // value: () => number; TODO
        range: UIWidgetRange;
        onValueChanged: () => void;
    }

    interface UIWidgetSpinBox extends UIWidgetDescription {
        widgetType: EUIWidgetType["SpinBox"];
        // value: () => number; // TODO
        range: UIWidgetRange;
        onValueChanged: () => void;
    }

    interface UIWidgetPathLineEdit extends UIWidgetDescription {
        widgetType: EUIWidgetType["PathLineEdit"];
        // text: () => string; // TODO
        label: Readonly<string>;
        caption: Readonly<string>
        pathType: Readonly<EUIPathType[keyof EUIPathType]>;
        onEditingFinished: () => void;
    }

    interface UIWidgetCallback {
        (): void;
        closeDialog: () => void;
    }

    interface UIWidgetLayout extends UIWidgetDescription {
        widgetType: EUIWidgetType["Layout"];
        layout: EUILayoutType[keyof EUILayoutType];
        items: Array<UIWidgetCheckBox | UIWidgetComboBox | UIWidgetLabel 
            | UIWidgetLayout | UIWidgetLineEdit | UIWidgetPathLineEdit 
            | UIWidgetPushButton | UIWidgetSlider | UIWidgetSpinBox 
            | UIWidgetTextEdit>;
        contentsMargins?: { 
            left: number, 
            top: number, 
            right: number, 
            bottom: number 
        };
        spacing?: number;
    }

    interface UIDialog extends UIRootWidget, UIWidgetLayout {}

    interface UI {
        showModalDialog(description: UIDialog): void;
        showModelessDialog(description: UIDialog): void;
        widgetType: EUIWidgetType;
        layoutType: EUILayoutType;
        alignment: EUIAlignment;
        sizePolicy: EUISizePolicy;
        orientation: EUIOrientation;
        echoMode: EUIEchoMode;
        pathType: EUIPathType;
    }

//  ██████  ██████   ██████       ██ ███████  ██████ ████████ 
//  ██   ██ ██   ██ ██    ██      ██ ██      ██         ██    
//  ██████  ██████  ██    ██      ██ █████   ██         ██    
//  ██      ██   ██ ██    ██ ██   ██ ██      ██         ██    
//  ██      ██   ██  ██████   █████  ███████  ██████    ██    

    interface Project {
        workspace: Workspace;
        model: {
            ADSRModulator: Entity<ADSRModulator>,
            ActionSheet: Entity<ActionSheet>,
            Asset: Entity<Asset>,
            AudioFile: Entity<AudioFile>,
            AudioSettings: Entity<AudioSettings>,
            AudioTable: Entity<AudioTable>,
            AudioTrack: Entity<AudioTrack>,
            AutomatableObject: Entity<AutomatableObject>,
            AutomationCurve: Entity<AutomationCurve>,
            PropertyDescription: Entity<PropertyDescription>,
            AutomationPoint: Entity<AutomationPoint>,
            AutomationTrack: Entity<AutomationTrack>,
            Automator: Entity<Automator>,
            AutopitchModulator: Entity<AutopitchModulator>,
            Bank: Entity<Bank>,
            BankFolder: Entity<BankFolder>,
            BoolPluginParameter: Entity<BoolPluginParameter>,
            ChannelMixEffect: Entity<ChannelMixEffect>,
            ChorusEffect: Entity<ChorusEffect>,
            Colorable: Entity<Colorable>,
            CommandSound: Entity<CommandSound>,
            CommandTarget: Entity<CommandTarget>,
            CompressorEffect: Entity<CompressorEffect>,
            ControlSurface: Entity<ControlSurface>,
            ControlSurfaceCustomBinding: Entity<ControlSurfaceCustomBinding>,
            ControlSurfaceCustomBindings: Entity<ControlSurfaceCustomBindings>,
            ControlSurfaceProtocol: Entity<ControlSurfaceProtocol>,
            ConvolutionReverbEffect: Entity<ConvolutionReverbEffect>,
            DAWAsset: Entity<DAWAsset>,
            DAWProject: Entity<DAWProject>,
            DataFile: Entity<DataFile>,
            DataPluginParameter: Entity<DataPluginParameter>,
            DataReferee: Entity<DataReferee>,
            DelayEffect: Entity<DelayEffect>,
            DistortionEffect: Entity<DistortionEffect>,
            EditorSettings: Entity<EditorSettings>,
            EffectChain: Entity<EffectChain>,
            EffectPreset: Entity<EffectPreset>,
            EffectPresetFolder: Entity<EffectPresetFolder>,
            Encodable: Entity<Encodable>,
            EncodableAsset: Entity<EncodableAsset>,
            EncodingSetting: Entity<EncodingSetting>,
            Event: Entity<Event>,
            EventAutomatableProperties: Entity<EventAutomatableProperties>,
            EventCondition: Entity<EventCondition>,
            EventFolder: Entity<EventFolder>,
            EventMixer: Entity<EventMixer>,
            EventMixerGroup: Entity<EventMixerGroup>,
            EventMixerMaster: Entity<EventMixerMaster>,
            EventMixerReturn: Entity<EventMixerReturn>,
            EventSound: Entity<EventSound>,
            FadeCurve: Entity<FadeCurve>,
            FlangerEffect: Entity<FlangerEffect>,
            FloatPluginParameter: Entity<FloatPluginParameter>,
            Folder: Entity<Folder<any>>,
            GainEffect: Entity<GainEffect>,
            GameParameter: Entity<GameParameter>,
            GroupTrack: Entity<GroupTrack>,
            HighpassEffect: Entity<HighpassEffect>,
            HighpassSimpleEffect: Entity<HighpassSimpleEffect>,
            ITEchoEffect: Entity<ITEchoEffect>,
            IntPluginParameter: Entity<IntPluginParameter>,
            LFOModulator: Entity<LFOModulator>,
            LimiterEffect: Entity<LimiterEffect>,
            Locale: Entity<Locale>,
            LoopRegion: Entity<LoopRegion>,
            Loopable: Entity<Loopable>,
            LoudnessMeter: Entity<LoudnessMeter>,
            LowpassEffect: Entity<LowpassEffect>,
            LowpassSimpleEffect: Entity<LowpassSimpleEffect>,
            MackieControlSurface: Entity<MackieControlSurface>,
            MackieExtendedControlSurface: Entity<MackieExtendedControlSurface>,
            ManagedObject: Entity<ManagedObject>,
            ManagedProperty: Entity<ManagedProperty>,
            ManagedPropertyMap: Entity<ManagedPropertyMap>,
            ManagedRelationship: Entity<ManagedRelationship>,
            ManagedRelationshipMap: Entity<ManagedRelationshipMap>,
            Marker: Entity<Marker>,
            MarkerTrack: Entity<MarkerTrack>,
            MasterAssetFolder: Entity<MasterAssetFolder>,
            MasterBankFolder: Entity<MasterBankFolder>,
            MasterEffectPresetFolder: Entity<MasterEffectPresetFolder>,
            MasterEventFolder: Entity<MasterEventFolder>,
            MasterParameterPresetFolder: Entity<MasterParameterPresetFolder>,
            MasterSandboxFolder: Entity<MasterSandboxFolder>,
            MasterTagFolder: Entity<MasterTagFolder>,
            MasterTrack: Entity<MasterTrack>,
            MeteringSettings: Entity<MeteringSettings>,
            MidiControlSurfaceProtocol: Entity<MidiControlSurfaceProtocol>,
            Mixer: Entity<Mixer>,
            MixerBus: Entity<MixerBus>,
            MixerBusEffectChain: Entity<MixerBusEffectChain>,
            MixerBusFader: Entity<MixerBusFader>,
            MixerBusPanner: Entity<MixerBusPanner>,
            MixerEffect: Entity<MixerEffect>,
            MixerGroup: Entity<MixerGroup>,
            MixerInput: Entity<MixerInput>,
            MixerMaster: Entity<MixerMaster>,
            MixerPort: Entity<MixerPort>,
            MixerReturn: Entity<MixerReturn>,
            MixerSend: Entity<MixerSend>,
            MixerStrip: Entity<MixerStrip>,
            MixerVCA: Entity<MixerVCA>,
            Modulator: Entity<Modulator>,
            Module: Entity<Module>,
            MultiSound: Entity<MultiSound>,
            MultibandEqEffect: Entity<MultibandEqEffect>,
            NamedMarker: Entity<NamedMarker>,
            NamedWorkspaceBasedSourceControlProvider: Entity<NamedWorkspaceBasedSourceControlProvider>,
            Notable: Entity<Notable>,
            ObjectSpatialiserEffect: Entity<ObjectSpatialiserEffect>,
            ObsoleteObject: Entity<ObsoleteObject>,
            OscControlSurfaceProtocol: Entity<OscControlSurfaceProtocol>,
            PannerEffect: Entity<PannerEffect>,
            ParamEqEffect: Entity<ParamEqEffect>,
            Parameter: Entity<Parameter>,
            ParameterCondition: Entity<ParameterCondition>,
            ParameterPreset: Entity<ParameterPreset>,
            ParameterPresetFolder: Entity<ParameterPresetFolder>,
            ParameterProperty: Entity<ParameterProperty>,
            ParameterPrototype: Entity<ParameterPrototype>,
            ParameterProxy: Entity<ParameterProxy>,
            PerforceProvider: Entity<PerforceProvider>,
            PitchShifterEffect: Entity<PitchShifterEffect>,
            Platform: Entity<Platform>,
            PlatformSpecificItem: Entity<PlatformSpecificItem>,
            PlayPercentage: Entity<PlayPercentage>,
            Plugin: Entity<Plugin>,
            PluginEffect: Entity<PluginEffect>,
            PluginOwner: Entity<PluginOwner>,
            PluginParameter: Entity<PluginParameter>,
            PluginSettings: Entity<PluginSettings>,
            PluginSound: Entity<PluginSound>,
            ProfilerFolder: Entity<ProfilerFolder>,
            ProfilerGraph: Entity<ProfilerGraph>,
            ProfilerGraphable: Entity<ProfilerGraphable>,
            ProfilerRecordingMarker: Entity<ProfilerRecordingMarker>,
            ProfilerSession: Entity<ProfilerSession>,
            ProfilerSessionFolder: Entity<ProfilerSessionFolder>,
            ProfilerSystemTrack: Entity<ProfilerSystemTrack>,
            ProfilerTrack: Entity<ProfilerTrack>,
            ProfilerTrackable: Entity<ProfilerTrackable>,
            ProgrammerSound: Entity<ProgrammerSound>,
            ProgrammerSoundPlaceholder: Entity<ProgrammerSoundPlaceholder>,
            ProjectSettings: Entity<ProjectSettings>,
            ProxyEffect: Entity<ProxyEffect>,
            Quantizable: Entity<Quantizable>,
            RandomizerModulator: Entity<RandomizerModulator>,
            ReferenceableData: Entity<ReferenceableData>,
            Region: Entity<Region>,
            ReturnTrack: Entity<ReturnTrack>,
            SFXReverbEffect: Entity<SFXReverbEffect>,
            SandboxEmitter: Entity<SandboxEmitter>,
            SandboxFolder: Entity<SandboxFolder>,
            SandboxListener: Entity<SandboxListener>,
            SandboxParameter: Entity<SandboxParameter>,
            SandboxParameterOwner: Entity<SandboxParameterOwner>,
            SandboxPositionable: Entity<SandboxPositionable>,
            SandboxScene: Entity<SandboxScene>,
            ScriptBasedProvider: Entity<ScriptBasedProvider>,
            Selectable: Entity<Selectable>,
            Selector: Entity<Selector>,
            Sidechain: Entity<Sidechain>,
            SidechainModulator: Entity<SidechainModulator>,
            SidechainTarget: Entity<SidechainTarget>,
            SilenceSound: Entity<SilenceSound>,
            SingleSound: Entity<SingleSound>,
            Snapshot: Entity<Snapshot>,
            SnapshotGroup: Entity<SnapshotGroup>,
            SnapshotList: Entity<SnapshotList>,
            SnapshotMasterTrack: Entity<SnapshotMasterTrack>,
            SnapshotModule: Entity<SnapshotModule>,
            SnapshotProperty: Entity<SnapshotProperty>,
            SnapshotTrack: Entity<SnapshotTrack>,
            Sound: Entity<Sound>,
            SoundScatterer: Entity<SoundScatterer>,
            SourceControlProvider: Entity<SourceControlProvider>,
            SpatialEffect: Entity<SpatialEffect>,
            SpatialiserEffect: Entity<SpatialiserEffect>,
            SslNucleusControlSurface: Entity<SslNucleusControlSurface>,
            SustainPoint: Entity<SustainPoint>,
            Tag: Entity<Tag>,
            TagFolder: Entity<TagFolder>,
            Taggable: Entity<Taggable>,
            TempoMarker: Entity<TempoMarker>,
            TfsProvider: Entity<TfsProvider>,
            ThreeEQEffect: Entity<ThreeEQEffect>,
            Timeline: Entity<Timeline>,
            TouchOscControlSurface: Entity<TouchOscControlSurface>,
            Track: Entity<Track>,
            TransceiverEffect: Entity<TransceiverEffect>,
            TransitionDestination: Entity<TransitionDestination>,
            TransitionDestinationFadeInCurve: Entity<TransitionDestinationFadeInCurve>,
            TransitionDestinationSound: Entity<TransitionDestinationSound>,
            TransitionFadeCurve: Entity<TransitionFadeCurve>,
            TransitionMarker: Entity<TransitionMarker>,
            TransitionRegion: Entity<TransitionRegion>,
            TransitionSourceFadeOutCurve: Entity<TransitionSourceFadeOutCurve>,
            TransitionSourceSound: Entity<TransitionSourceSound>,
            TransitionTimeline: Entity<TransitionTimeline>,
            TransitionTimelineOwner: Entity<TransitionTimelineOwner>,
            TremoloEffect: Entity<TremoloEffect>,
            TriggerCondition: Entity<TriggerCondition>,
            Triggerable: Entity<Triggerable>,
            UiMixerView: Entity<UiMixerView>,
            UserProperty: Entity<UserProperty>,
            Workspace: Entity<Workspace>,
            WorkspaceBasedSourceControlProvider: Entity<WorkspaceBasedSourceControlProvider>,
            WorkspaceChangelist: Entity<WorkspaceChangelist>,
            WorkspaceItem: Entity<WorkspaceItem<any>>
        };
        save(): boolean;
        build(options?: {
            banks: string | string[],
            platforms: string | string[]
        }): boolean;
        exportGUIDs(): boolean;
        findAvailablePlugins(): string[];
        projectLookup(idOrPath: string): ManagedObject;
        create(entityName: EntityName): ManagedObject;
        deleteObject(obj: ManagedObject): boolean;
        filePath(): string;
        importAudioFile(filePath: string): AudioFile;
        audioFileImported: {
            connect(fn: (audioFile: AudioFile) => void): void;
            disconnect(fn: (audioFile: AudioFile) => void): void;
        };
        buildStarted: {
            connect(fn: () => void): void;
            disconnect(fn: () => void): void;
        };
        buildEnded: {
            connect(fn: () => void): void;
            disconnect(fn: () => void): void;
        };
        distanceRollOffType: EDistanceRolloffType[keyof EDistanceRolloffType];
        parameterType: EParameterType[keyof EParameterType];
        regionLoopMode: ERegionLoopMode;
    }

//  ███████ ██    ██ ███████ ████████ ███████ ███    ███ 
//  ██       ██  ██  ██         ██    ██      ████  ████ 
//  ███████   ████   ███████    ██    █████   ██ ████ ██ 
//       ██    ██         ██    ██    ██      ██  ██  ██ 
//  ███████    ██    ███████    ██    ███████ ██      ██ 


    interface System {
        openMode: EOpenMode;
        permission: EPermissions;
        require(fileName: string): void;
        backtrace(): void;
        // biome-ignore lint/suspicious/noExplicitAny: can be any 
        verbose(msg: any): void;
        // biome-ignore lint/suspicious/noExplicitAny: can be any
        print(msg: any): void;
        // biome-ignore lint/suspicious/noExplicitAny: can be any
        warn(msg: any): void;
        // biome-ignore lint/suspicious/noExplicitAny: can be any
        error(msg: any): void;
        message(msg: string): void;
        question(msg: string): boolean | null;
        getText(msg: string, defaultText?: string): string | null;
        getNumber(msg: string, defaultValue?: number): number | null;
        startAsync(executablePath: string, opts: { workingDir: string, args: string }): ScriptProcess;
        getFile(filePath: string): File;
    }

    interface File {
        exists(): boolean;
        open(openModeFlag: EOpenMode): boolean;
        writeText(text: string): number;
        readText(maxNumBytes: number): string;
        writeBinary(byteArray: BinaryData): number;
        readBinary(maxNumBytes: number): BinaryData;
        close(): boolean;
        copy(filePath: string): void;
        remove(): boolean;
        size(): number;
        permissions(): EPermissions;
        setPermissions(permisions: EPermissions): boolean;
    }

    interface ScriptProcess {
        isRunning(): boolean;
        // biome-ignore lint/suspicious/noExplicitAny: needs testing to know type
        readAllStandardOutput(): any;
        // biome-ignore lint/suspicious/noExplicitAny: needs testing to know type
        readAllStandardError(): any;
        writeStandardInput(text: string, timeoutms: number): void;
        kill(): void;
    }

//  ██     ██ ██ ███    ██ ██████   ██████  ██     ██ 
//  ██     ██ ██ ████   ██ ██   ██ ██    ██ ██     ██ 
//  ██  █  ██ ██ ██ ██  ██ ██   ██ ██    ██ ██  █  ██ 
//  ██ ███ ██ ██ ██  ██ ██ ██   ██ ██    ██ ██ ███ ██ 
//   ███ ███  ██ ██   ████ ██████   ██████   ███ ███  
                                                      
    interface Window {
        open(type: WindowType): void;
        navigateTo(obj: ManagedObject): void;
        browserCurrent(tabName?: string): ManagedObject;
        browserSelection(tabName?: string): ManagedObject[];
        editorCurrent(): ManagedObject;
        editorSelection(): ManagedObject[];
        deckCurrent(): ManagedObject;
        deckSelection(): ManagedObject[];
        triggerAction(action: EWindowAction): void;
    }

//  ███████ ████████ ██    ██ ██████  ██  ██████  
//  ██         ██    ██    ██ ██   ██ ██ ██    ██ 
//  ███████    ██    ██    ██ ██   ██ ██ ██    ██ 
//       ██    ██    ██    ██ ██   ██ ██ ██    ██ 
//  ███████    ██     ██████  ██████  ██  ██████  

    interface Studio {
        application: {
            filePath: string
        };
        os: {
            platform: string
        };
        menu: Menu;
        project: Project;
        system: System;
        ui: UI;
        window: Window;
        version: {
            productVersion: number,
            majorVersion: number,
            minorVersion: number,
            changelist: number
        };
    }

//  ████████ ██    ██ ██████  ███████ ███████ 
//     ██     ██  ██  ██   ██ ██      ██      
//     ██      ████   ██████  █████   ███████ 
//     ██       ██    ██      ██           ██ 
//     ██       ██    ██      ███████ ███████ 

    type EffectName =
        'ThreeEQEffect' |
        'ChannelMixerEffect' |
        'ChorusEffect' |
        'CompressorEffect' |
        'ConvolutionReverbEffect' |
        'DistortionEffect' |
        'DelayEffect' |
        'FlangerEffect' |
        'GainEffect' |
        'LimiterEffect' |
        'MultibandEqEffect' |
        'PitchShifterEffect' |
        'SFXReverbEffect' |
        'TransceiverEffect' |
        'TremoloEffect' |
        'HighpassEffect' |
        'HighpassSimpleEffect' |
        'LowpassEffect' |
        'LowpassSimpleEffect' |
        'ParamEqEffect' |
        'SpatialiserEffect' |
        'ObjectSpatialiserEffect' |
        'LoudnessMeter';

    type EntityName =
        | "ADSRModulator"
        | "ActionSheet"
        | "Asset"
        | "AudioFile"
        | "AudioSettings"
        | "AudioTable"
        | "AudioTrack"
        | "AutomatableObject"
        | "AutomationCurve"
        | "PropertyDescription"
        | "AutomationPoint"
        | "AutomationTrack"
        | "Automator"
        | "AutopitchModulator"
        | "Bank"
        | "BankFolder"
        | "BoolPluginParameter"
        | "ChannelMixEffect"
        | "ChorusEffect"
        | "Colorable"
        | "CommandSound"
        | "CommandTarget"
        | "CompressorEffect"
        | "ControlSurface"
        | "ControlSurfaceCustomBinding"
        | "ControlSurfaceCustomBindings"
        | "ControlSurfaceProtocol"
        | "ConvolutionReverbEffect"
        | "DAWAsset"
        | "DAWProject"
        | "DataFile"
        | "DataPluginParameter"
        | "DataReferee"
        | "DelayEffect"
        | "DistortionEffect"
        | "EditorSettings"
        | "EffectChain"
        | "EffectPreset"
        | "EffectPresetFolder"
        | "Encodable"
        | "EncodableAsset"
        | "EncodingSetting"
        | "Event"
        | "EventAutomatableProperties"
        | "EventCondition"
        | "EventFolder"
        | "EventMixer"
        | "EventMixerGroup"
        | "EventMixerMaster"
        | "EventMixerReturn"
        | "EventSound"
        | "FadeCurve"
        | "FlangerEffect"
        | "FloatPluginParameter"
        | "Folder"
        | "GainEffect"
        | "GameParameter"
        | "GroupTrack"
        | "HighpassEffect"
        | "HighpassSimpleEffect"
        | "ITEchoEffect"
        | "IntPluginParameter"
        | "LFOModulator"
        | "LimiterEffect"
        | "Locale"
        | "LoopRegion"
        | "Loopable"
        | "LoudnessMeter"
        | "LowpassEffect"
        | "LowpassSimpleEffect"
        | "MackieControlSurface"
        | "MackieExtendedControlSurface"
        | "ManagedObject"
        | "ManagedProperty"
        | "ManagedPropertyMap"
        | "ManagedRelationship"
        | "ManagedRelationshipMap"
        | "Marker"
        | "MarkerTrack"
        | "MasterAssetFolder"
        | "MasterBankFolder"
        | "MasterEffectPresetFolder"
        | "MasterEventFolder"
        | "MasterParameterPresetFolder"
        | "MasterSandboxFolder"
        | "MasterTagFolder"
        | "MasterTrack"
        | "MeteringSettings"
        | "MidiControlSurfaceProtocol"
        | "Mixer"
        | "MixerBus"
        | "MixerBusEffectChain"
        | "MixerBusFader"
        | "MixerBusPanner"
        | "MixerEffect"
        | "MixerGroup"
        | "MixerInput"
        | "MixerMaster"
        | "MixerPort"
        | "MixerReturn"
        | "MixerSend"
        | "MixerStrip"
        | "MixerVCA"
        | "Modulator"
        | "Module"
        | "MultiSound"
        | "MultibandEqEffect"
        | "NamedMarker"
        | "NamedWorkspaceBasedSourceControlProvider"
        | "Notable"
        | "ObjectSpatialiserEffect"
        | "ObsoleteObject"
        | "OscControlSurfaceProtocol"
        | "PannerEffect"
        | "ParamEqEffect"
        | "Parameter"
        | "ParameterCondition"
        | "ParameterPreset"
        | "ParameterPresetFolder"
        | "ParameterProperty"
        | "ParameterPrototype"
        | "ParameterProxy"
        | "PerforceProvider"
        | "PitchShifterEffect"
        | "Platform"
        | "PlatformSpecificItem"
        | "PlayPercentage"
        | "Plugin"
        | "PluginEffect"
        | "PluginOwner"
        | "PluginParameter"
        | "PluginSettings"
        | "PluginSound"
        | "ProfilerFolder"
        | "ProfilerGraph"
        | "ProfilerGraphable"
        | "ProfilerRecordingMarker"
        | "ProfilerSession"
        | "ProfilerSessionFolder"
        | "ProfilerSystemTrack"
        | "ProfilerTrack"
        | "ProfilerTrackable"
        | "ProgrammerSound"
        | "ProgrammerSoundPlaceholder"
        | "ProjectSettings"
        | "ProxyEffect"
        | "Quantizable"
        | "RandomizerModulator"
        | "ReferenceableData"
        | "Region"
        | "ReturnTrack"
        | "SFXReverbEffect"
        | "SandboxEmitter"
        | "SandboxFolder"
        | "SandboxListener"
        | "SandboxParameter"
        | "SandboxParameterOwner"
        | "SandboxPositionable"
        | "SandboxScene"
        | "ScriptBasedProvider"
        | "Selectable"
        | "Selector"
        | "Sidechain"
        | "SidechainModulator"
        | "SidechainTarget"
        | "SilenceSound"
        | "SingleSound"
        | "Snapshot"
        | "SnapshotGroup"
        | "SnapshotList"
        | "SnapshotMasterTrack"
        | "SnapshotModule"
        | "SnapshotProperty"
        | "SnapshotTrack"
        | "Sound"
        | "SoundScatterer"
        | "SourceControlProvider"
        | "SpatialEffect"
        | "SpatialiserEffect"
        | "SslNucleusControlSurface"
        | "SustainPoint"
        | "Tag"
        | "TagFolder"
        | "Taggable"
        | "TempoMarker"
        | "TfsProvider"
        | "ThreeEQEffect"
        | "Timeline"
        | "TouchOscControlSurface"
        | "Track"
        | "TransceiverEffect"
        | "TransitionDestination"
        | "TransitionDestinationFadeInCurve"
        | "TransitionDestinationSound"
        | "TransitionFadeCurve"
        | "TransitionMarker"
        | "TransitionRegion"
        | "TransitionSourceFadeOutCurve"
        | "TransitionSourceSound"
        | "TransitionTimeline"
        | "TransitionTimelineOwner"
        | "TremoloEffect"
        | "TriggerCondition"
        | "Triggerable"
        | "UiMixerView"
        | "UserProperty"
        | "Workspace"
        | "WorkspaceBasedSourceControlProvider"
        | "WorkspaceChangelist"
        | "WorkspaceItem";

    type Event3DAttributes = {
        radialDistance: number,
        azimuth: number,
        height: number,
        rotation: number
    };

    type ModulatorType = 'RandomizerModulator' | 'ADSRModulator' | 'SidechainModulator';
    type SoundType = 'SingleSound' | 'MultiSound' | 'ProgrammerSound';

    type EBirdsEyeDragMode = {
        "Minimap": 0,
        "ZoomInOut": 1,
        "ScrollHorizontallyOnly": 2
    };

    type EChannelFormat = {
        "Mono": 0,
        "Stereo": 1,
        "Platform": 2,
        "Surround_4.0": 3,
        "Surround_5.0": 4,
        "Souround_5.1": 5,
        "Souround_7.1": 6,
        "Souround_7.1.4": 7,
    };

    type EChannelMixEffectOutputGrouping = {
        "None": 0,
        "Mono": 1,
        "Stereo": 2,
        "Quad": 3,
        "5.1": 4,
        "7.1": 5,
        "LFE": 6,
        "7.1.4": 7
    };

    type ECommandType = {
        "StartEvent": 0,
        "StopEvent": 1,
        "StopEventImmediate": 2,
        "SetParameter": 3,
        "IncrementParameter": 4
    };

    // TODO(mhartung) where is this used?
    type EDataDropMode = { 
        "File": 0, 
        "Text": 1 
    };

    type EDelayType = {
        "Time": 0,
        "Tempo": 1
    };

    type EDistanceRolloffType = {
        "LinearSquared": 0,
        "Linear": 1,
        "Inverse": 2,
        "InverseTapered": 3,
        "Custom": 4
    };

    type EEncodingFormat = {
        "Vorbis": 0,
        "FADPCM": 1,
        "PCM:": 2
    };

    type EEventState = {
        "NotStopping": 0,
        "Stopping": 1
    };

    type EExtentMode = {
        "Auto": 0,
        "User": 1,
        "Off": 2
    };

    type EInstanceStealing = {
        "Oldest": 0,
        "Quietest": 1,
        "Virtualize": 2,
        "None": 3,
        "Furthest": 4
    };

    type ELinkedAssetsRenderMode = {
        "WhenDAWProjectIsSave": 0,
        "OnFmodStudioFocus": 1,
        "Never": 2
    };

    type ELinkedAssetsRemovalMode = {
        "AfterRenderingIfSourceAssetsAreNoLongerOnDisk": 0,
        "Never": 1
    };

    type ELFOShape = {
        "Sine": 0,
        "Square": 1,
        "Triangle": 2,
        "SawUp": 3,
        "SawDown": 4,
        "NoiseStepped": 5,
        "NoiseRamped": 6
    };

    type ELoadingMode = {
        "Default": 0,
        "Stream": 1
    };

    type ELoudnessMeterMode = {
        "Momentary": 0,
        "ShorTerm": 1
    };
    
    type ELoudnessMeterRange = {
        "EBU+9": 0,
        "EBU+18": 1
    };

    type ELoudnessMeterScale = {
        "Absolute": 0,
        "Relative": 1
    };

    type EMeteringChannelOrder = {
        "Standard": 0,
        "SeparateLFE": 1,
        "Positional": 2
    };

    type EMixerPortType = {
        "Music": 0,
        "CopyrightMusic": 1,
        "Voice": 2,
        "ControllerSpeaker": 3,
        "Personal": 4,
        "Vibration": 5,
        "Auxiliary": 6
    };

    type EMultibandEqEffectFilterType = {
        "Off": 0,
        "LP12dB": 1,
        "LP24dB": 2,
        "LP48dB": 3,
        "HP12dB": 4,
        "HP24dB": 8,
        "HP48dB": 16,
        "Lowshelf": 32,
        "Highshelf": 64,
        "Peaking": 128,
        "Bandpass": 256,
        "Notch": 512,
        "Allpass": 1024
    };

    type EOpenMode = {
        "NotOpen": 0,
        "ReadOnly": 1,
        "WriteOnly": 2,
        "ReadWrite": 3,
        "Append": 4,
        "Truncate": 8,
        "Text": 16,
        "Unbuffered": 32
    };

    type EParameterType = {
        "User": 0,
        "UserDiscrete": 1,
        "UserEnumeration": 2,
        "Distance": 3,
        "Direction": 4,
        "Elevation": 5,
        "EventConeAngle": 6,
        "EventOrientation": 7,
        "Speed": 8
    };

    type EPermissions = {
        "ReadOwner": 16384,
        "WriteOwner": 8192,
        "ExeOwner": 4096,
        "ReadUser": 1024,
        "WriteUser": 512,
        "ExeUser": 256,
        "ReadGroup": 64,
        "WriteGroup": 32,
        "ExeGroup": 16,
        "ReadOther": 4,
        "WriteOther": 2,
        "ExeOther": 1,
        "Exe": 273,
        "Write": 8738,
        "Read": 17476
    };

    type EPlatformSpeakerFormat = {
        "Stereo": 0,
        "Surround_5.1": 1,
        "Surround_7.1": 2
    };

    type EPlaylistMode = {
        "Shuffle": 0,
        "Randomize": 1,
        "SequentialLocalScope": 2,
        "SequentialGlobalScope": 3
    };

    // TODO(mhartung) where is this used
    type EProcessError = {
        "FailedToStart": 0,
        "Crashed": 1,
        "Timedout": 2,
        "ReadError": 3,
        "WriteError": 4
    };

    type EProfilerGraphType = {
        "CPU:Mixer": 0,
        "CPU:Update": 1,
        "Memory:Data": 2,
        "Memory:Samples": 3,
        "Levels": 4,
        "VoicesSelf": 5,
        "VoicesTotal": 6,
        "Lifespans": 7,
        "InstancesSelf": 8,
        "InstancesTotal": 16
    };

    type EProfilerTableValueMode = {
        "InstantaneousValue": 0,
        "AverageValue": 1,
        "MaximumValue": 2,
        "MinimumValue": 3
    };

    type EQuantizationInterval = {
        "Off": 0,
        "2_Bars": 1,
        "1_Bar": 2,
        "1/2_Note": 3,
        "3/8_Note": 4,
        "1/4_Note": 5,
        "1/8_Note": 6,
        "3_Bars": 7,
        "4_Bars": 8,
        "5_Bars": 9,
        "6_Bars": 10,
        "7_Bars": 11,
        "8_Bars": 12,
    };

    type ERegionLoopMode = {
        "None": 0,
        "Looping": 1,
        "Magnet": 2
    };

    type ESampleRateMode = {
        "Custom": 0,
        "OptimizedForSize": 1,
        "Preserved": 2
    };

    type EScrollMode = {
        "DoNothing": 0,
        "ScrollVertically": 1,
        "ScrollHorizontally": 2,
        "ZoomInOut": 3
    };

    type ESidechainModulatorLevelMode = {
        "Peak": 0,
        "RMS": 1,
    };

    type ESnapshotBehavior = {
        "Overriding": 0,
        "Blending": 1
    };

    type ESoundScattererSoundStealing = {
        "Oldest": 0,
        "None": 1
    };

    type ESpeakerMode = {
        "Auto": 0,
        "Mono": 1,
        "Stereo": 2,
        "Surround": 3
    };

    type EStartupMode = {
        "OpenWelcomeDialoge": 0,
        "OpenMostRecentProject": 1,
        "OpenNewProject": 2
    };

    type EStereoToSurroundPanMode = {
        "StereoInDistributed": 0,
        "StereoInLR": 1
    };
    
    type ETimeDisplayMode = {
        "Time": 0,
        "Beats": 1
    };

    type ETransitionOffset = {
        "None": 0,
        "Relative": 1,
        "Inverted": 2
    };

    type ETriggerConditionMode = {
        "AND": 0,
        "OR": 1
    };

    type EUIAlignment = {
        "AlignLeft": 1,
        "AlignRight": 2,
        "AlignHCenter": 4,
        "AlignJustify": 8,
        "AlignAbsolute": 16,
        "AlignTop": 32,
        "AlignBottom": 64,
        "AlignVCenter": 128,
        "AlignBaseline": 256,
        "AlignCenter": 132
    };

    type EUIAutomationTracksVisible = {
        "Never": 0,
        "Always": 1
    };

    type EUIEchoMode = {
        "Normal": 0,
        "NoEcho": 1,
        "Password": 2,
        "PasswordEchoOnEdit": 3
    };

    type EUILayoutType = {
        "HBoxLayout": 0,
        "VBoxLayout": 1,
        "GridLayout": 2
    };

    type EUIModulationDrawerVisible = {
        "Never": 0,
        "Always": 1
    };

    type EUIOrientation = {
        "Horizontal": 0,
        "Vertical": 1
    };

    type EUISizePolicy = {
        "Fixed": 0,
        "Minimum": 1,
        "Maximum": 4,
        "Preferred": 5,
        "MinimumExpanding": 3,
        "Expanding": 7,
        "Ignored": 13
    };
    
    type EUITriggerBehaviorDrawerVisible = {
        "Never": 0,
        "Always": 1
    };

    type EUIPathType = {
        "OpenFile": 0,
        "SaveFile": 1,
        "Directory": 2
    };

    type EUIWidgetType = {
        "Spacer": 0,
        "Layout": 1,
        "Label": 2,
        "PushButton": 3,
        "LineEdit": 4,
        "TextEdit": 5,
        "ComboBox": 6,
        "CheckBox": 7,
        "Slider": 8,
        "SpinBox": 9,
        "PathLineEdit": 10
    };

    type EVoiceStealing = {
        "Oldest": 0,
        "Quietest": 1,
        "Virtualize": 2,
        "None": 3,
        "Furthest": 4
    };

    type EWindowAction = {
        "Copy": 0,
        "Paste": 1,
        "Delete": 2,
        "Duplicate": 3,
        "NewProject": 4,
        "OpenProject": 5,
        "CloseProject": 6,
        "OpenMostRecentFile": 7,
        "ClearRecentFiles": 8,
        "Save": 9,
        "SaveAs": 10,
        "RevertToSaved": 11,
        "ExitApplication": 12,
        "ShowPreferences": 13,
        "ShowAbout": 14,
        "ShowWelcome": 15,
        "ShowQuickStartTutorial": 16,
        "ShowUserManual": 17,
        "ShowQuestionsPage": 18,
        "ShowSupportEmail": 19,
        "ShowFMODio": 20,
        "Undo": 21,
        "Redo": 22,
        "Find": 23,
        "Build": 24,
        "BuildAllPlatforms": 25,
        "ExportGuids": 26,
        "ImportAudioFiles": 27,
        "RefreshModifiedAssets": 28,
        "ValidateProject": 29,
        "PackageProject": 30,
        "ToggleConnectToGame": 31,
        "ViewBrowser": 32,
        "ViewDeck": 33,
        "ViewProperties": 34,
        "ZoomIn": 35,
        "ZoomOut": 36,
        "ZoomToFit": 37,
        "OpenInNewWindow": 38,
        "OpenInFileSystem": 39,
        "OpenInExternal": 40,
        "Split": 41,
        "BringToFront": 42,
        "SendToBack": 43,
        "MoveTo": 44,
        "MoveToCursor": 45,
        "Rename": 46,
        "SourceControlBrowseForProject": 47,
        "SourceControlSync": 48,
        "SourceControlCommit": 49,
        "SourceControlRevert": 50,
        "SourceControlIdentifyLocalChanges": 51,
        "NewBrowserItem": 52,
        "NewBrowserFolder": 53,
        "NewMixerGroup": 54,
        "NewMixerReturn": 55,
        "NewParameter": 56,
        "IncreaseDefaultTrackHeight": 57,
        "DecreaseDefaultTrackHeight": 58,
        "ToggleFilePlayback": 59,
        "LoopPlayback": 60,
        "FollowPlaybackPosition": 61,
        "SnapToItems": 62,
        "SnapToRuler": 63,
        "ShowLogicTracks": 64,
        "ShowOverlappingInstrumentsInLanes": 65,
        "ShowMarkerLines": 66,
        "ShowAutomationValues": 67,
        "ShowCompactStrips": 68,
        "ToggleBulkEdit": 69,
        "NewTab": 70,
        "CloseTab": 71,
        "WindowMinimize": 72,
        "WindowMaximize": 73,
        "WindowCycle": 74,
        "WindowBringAllToFront": 75,
        "WindowClose": 76,
        "ScriptReload": 77,
        "MergeConflictingAsset": 78,
        "ToggleTransitionTimelineVisibility": 79,
        "AddTransitionTimeline": 80,
        "RemoveTransitionTimeline": 81,
        "SandboxToggleEmitter_01": 82,
        "SandboxToggleEmitter_02": 83,
        "SandboxToggleEmitter_03": 84,
        "SandboxToggleEmitter_04": 85,
        "SandboxToggleEmitter_05": 86,
        "SandboxToggleEmitter_06": 87,
        "SandboxToggleEmitter_07": 88,
        "SandboxToggleEmitter_08": 89,
        "SandboxToggleEmitter_09": 90,
        "SandboxToggleEmitter_10": 91,
        "FlattenBrowserFolders": 92,
        "NumActionsWithoutArgs": 93,
        "SetModuleColor": 94,
        "OpenNewWindow": 95,
        "OpenWindowWithArgs": 96,
        "SetTrackHeight": 97,
        "SetDefaultTrackHeight": 98,
        "InvalidAction": 99
    };

    type WindowType = 
        | "Event Editor" 
        | "Mixer" 
        | "Audio Bin" 
        | "Preset Browser" 
        | "Event Browser" 
        | "Mixer Routing" 
        | "Profiler" 
        | "Sandbox" 
        | "Console";

} 