# Stage 1: Build
FROM gradle:8.8-jdk17 AS build
WORKDIR /app

COPY backend/artif/build.gradle backend/artif/settings.gradle backend/artif/gradlew ./
COPY backend/artif/gradle ./gradle
COPY backend/artif/src ./src

RUN ./gradlew build -x test

# Stage 2: Run
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

COPY --from=build /app/build/libs/artif-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
