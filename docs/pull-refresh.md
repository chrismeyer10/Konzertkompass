# Compose Pull Refresh Dependency

To use the experimental pull-to-refresh APIs in Jetpack Compose, add the following dependency in your module's `build.gradle`:

```kotlin
dependencies {
    implementation("androidx.compose.material:pull-refresh:1.5.0")
}
```

Then import the APIs:

```kotlin
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.pullrefresh.PullRefreshIndicator
import androidx.compose.material.pullrefresh.pullRefresh
import androidx.compose.material.pullrefresh.rememberPullRefreshState
```

Because the API is marked `@ExperimentalMaterialApi`, annotate your composable or file with `@OptIn(ExperimentalMaterialApi::class)` if necessary.
